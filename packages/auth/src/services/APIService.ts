import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { BehaviorSubject } from 'rxjs';
import AuthService from './AuthService';

export interface APICallQueue {
  id: string;
  request: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  retryCount: number;
}

export interface APIErrorResponse {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

export interface APIServiceConfig {
  baseURL?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

class APIService {
  private static instance: APIService;
  private clients: Map<string, AxiosInstance> = new Map();
  private authService: AuthService;
  private callQueue: APICallQueue[] = [];
  private isRefreshing = false;
  private refreshPromise: Promise<void> | null = null;
  private config: APIServiceConfig;

  private networkStatus = new BehaviorSubject<boolean>(true);
  public networkStatus$ = this.networkStatus.asObservable();

  private constructor(config: APIServiceConfig = {}) {
    this.authService = AuthService.shared;
    this.config = {
      timeout: 15000,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config,
    };
    this.setupDefaultClient();
  }

  static getInstance(config?: APIServiceConfig): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService(config);
    }
    return APIService.instance;
  }

  private setupDefaultClient() {
    const defaultClient = axios.create({
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors(defaultClient);
    this.clients.set('default', defaultClient);
  }

  createModuleClient(moduleId: string, baseURL: string, config?: APIServiceConfig): AxiosInstance {
    if (this.clients.has(moduleId)) {
      return this.clients.get(moduleId)!;
    }

    const clientConfig = { ...this.config, ...config };
    const client = axios.create({
      baseURL,
      timeout: clientConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors(client, moduleId);
    this.clients.set(moduleId, client);
    return client;
  }

  private setupInterceptors(client: AxiosInstance, moduleId?: string) {
    // Request interceptor
    client.interceptors.request.use(
      async (config) => {
        const token = await this.authService.getCredentials();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add module ID to headers for tracking
        if (moduleId) {
          config.headers['X-Module-ID'] = moduleId;
        }

        // Add request timestamp
        config.headers['X-Request-Time'] = new Date().toISOString();

        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(this.normalizeError(error));
      }
    );

    // Response interceptor
    client.interceptors.response.use(
      (response) => {
        this.networkStatus.next(true);
        return response.data;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean; _retryCount?: number };

        // Handle network errors
        if (!error.response) {
          this.networkStatus.next(false);
          return Promise.reject(this.normalizeError(error));
        }

        this.networkStatus.next(true);

        // Handle 401 errors (token refresh)
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue the request
            return new Promise((resolve, reject) => {
              this.callQueue.push({
                id: Date.now().toString(),
                request: () => client.request(originalRequest),
                resolve,
                reject,
                retryCount: 0,
              });
            });
          }

          originalRequest._retry = true;

          try {
            await this.refreshToken();
            return client.request(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            throw this.normalizeError(refreshError);
          }
        }

        // Handle retryable errors (5xx, timeouts, network issues)
        if (this.shouldRetry(error) && !originalRequest._retry) {
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

          if (originalRequest._retryCount <= (this.config.retryAttempts || 3)) {
            await this.delay(this.config.retryDelay || 1000);
            return client.request(originalRequest);
          }
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private async refreshToken(): Promise<void> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performTokenRefresh();

    try {
      await this.refreshPromise;
      this.processQueue();
    } catch (error) {
      this.processQueue(error);
      throw error;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<void> {
    try {
      // This would typically call your auth endpoint to refresh the token
      // For now, we'll use the existing AuthService pattern
      const currentToken = await this.authService.getCredentials();
      if (!currentToken) {
        throw new Error('No token to refresh');
      }

      // In a real implementation, you'd call your refresh endpoint here
      // const response = await axios.post('/auth/refresh', { token: currentToken });
      // await this.authService.setCredentials(response.data.token);

      // For now, we'll just validate the existing token
      console.log('Token refresh would happen here');
    } catch (refreshError) {
      console.error('Token refresh error:', refreshError);
      // Clear invalid token
      await this.authService.removeCredentials();
      throw new Error('Token refresh failed');
    }
  }

  private processQueue(error?: any) {
    this.callQueue.forEach(({ resolve, reject, request }) => {
      if (error) {
        reject(error);
      } else {
        resolve(request());
      }
    });
    this.callQueue = [];
  }

  private shouldRetry(error: AxiosError): boolean {
    if (!error.response) {
      // Network error, retry
      return true;
    }

    const status = error.response.status;
    // Retry on 5xx errors and 429 (rate limit)
    return status >= 500 || status === 429;
  }

  private normalizeError(error: any): APIErrorResponse {
    if (error.response) {
      return {
        message: error.response.data?.message || error.message || 'API Error',
        status: error.response.status,
        code: error.response.data?.code || error.code,
        details: error.response.data,
      };
    }

    if (error.request) {
      return {
        message: 'Network Error - Please check your connection',
        status: 0,
        code: 'NETWORK_ERROR',
        details: error.message,
      };
    }

    return {
      message: error.message || 'Unknown Error',
      status: 0,
      code: 'UNKNOWN_ERROR',
      details: error,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getClient(moduleId: string = 'default'): AxiosInstance {
    const client = this.clients.get(moduleId);
    if (!client) {
      throw new Error(`API client not found for module: ${moduleId}`);
    }
    return client;
  }

  async makeAuthorizedCall<T>(
    moduleId: string,
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const client = this.getClient(moduleId);

    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'X-Module-Request': moduleId,
      },
    };

    switch (method.toLowerCase()) {
      case 'get':
        return client.get(url, requestConfig);
      case 'post':
        return client.post(url, data, requestConfig);
      case 'put':
        return client.put(url, data, requestConfig);
      case 'patch':
        return client.patch(url, data, requestConfig);
      case 'delete':
        return client.delete(url, requestConfig);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  // Convenience methods
  async get<T>(url: string, config?: AxiosRequestConfig, moduleId: string = 'default'): Promise<T> {
    return this.makeAuthorizedCall<T>(moduleId, 'get', url, undefined, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig, moduleId: string = 'default'): Promise<T> {
    return this.makeAuthorizedCall<T>(moduleId, 'post', url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig, moduleId: string = 'default'): Promise<T> {
    return this.makeAuthorizedCall<T>(moduleId, 'put', url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig, moduleId: string = 'default'): Promise<T> {
    return this.makeAuthorizedCall<T>(moduleId, 'patch', url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig, moduleId: string = 'default'): Promise<T> {
    return this.makeAuthorizedCall<T>(moduleId, 'delete', url, undefined, config);
  }

  // Upload file with progress tracking
  async uploadFile<T>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void,
    moduleId: string = 'default'
  ): Promise<T> {
    const client = this.getClient(moduleId);

    return client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(Math.round(progress));
        }
      },
    });
  }

  // Cancel all pending requests for a module
  cancelModuleRequests(moduleId: string): void {
    // Remove queued requests for this module
    this.callQueue = this.callQueue.filter(item =>
      !item.id.includes(moduleId)
    );
  }

  // Update configuration
  updateConfig(config: Partial<APIServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // Clear all clients (useful for logout)
  clearClients(): void {
    this.clients.clear();
    this.callQueue = [];
    this.setupDefaultClient();
  }

  // Get network status
  isOnline(): boolean {
    return this.networkStatus.value;
  }
}

export default APIService;
