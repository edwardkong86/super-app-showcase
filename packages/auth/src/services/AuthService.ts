import AsyncStorage from '@react-native-async-storage/async-storage';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import APIService from './APIService';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  roles: string[];
  permissions: string[];
  modules: string[];
}

export interface ModulePermission {
  moduleId: string;
  permissions: string[];
  roles: string[];
  apiEndpoint: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface GeoLocationInfo {
  Latitude: string;
  Longitude: string;
  Status: string;
  Timestamp: string;
  HorizontalAccuracy: string;
}

export interface MobileSDKData {
  deviceDetail: string;
  deviceId: string;
  deviceModel: string;
  deviceName: string;
  devicePrint: string;
  osType: string;
  osVersion: string;
  rsaKey: string;
  hardwareID: string;
  screenSize: string;
  languages: string;
  multitaskingSupported: boolean;
  timestamp: string;
  geoLocationInfo: GeoLocationInfo;
  emulator: number;
  osId: string;
  compromised: number;
  sdkVersion: string;
  appState: string;
  keyChainErrorOnStoring: string;
  keyChainErrorOnRetrieve: string;
}

export interface EnrollmentRequest {
  grantType: string;
  tokenType: string;
  customerKey?: string;
  mobileSDKData: MobileSDKData;
  limitApproved: boolean;
  marketing: boolean;
  showBalanceDashboard: boolean;
  userDashboard: string | null;
  fromModule: string;
  bioEventCode?: string;
  rsaType?: string;
  challenge?: any;
  username?: string;
  passwd?: string;
  notificationRequired?: boolean;
}

class AuthService {
  private static instance: AuthService;
  private tokensSubject = new BehaviorSubject<AuthTokens | null>(null);
  private userSubject = new BehaviorSubject<User | null>(null);
  private modulePermissions = new Map<string, ModulePermission>();

  public tokens$ = this.tokensSubject.asObservable();
  public user$ = this.userSubject.asObservable();
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  private readonly TOKEN_KEY = 'auth_tokens';
  private readonly CUST_KEY = 'auth_custkey';
  private readonly USER_KEY = 'auth_user';

  private constructor() {
    this.initializeAuth();
    this.setupModulePermissions();
  }

  static get shared(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async initializeAuth(): Promise<void> {
    try {
      // const storedCustKey = await AsyncStorage.getItem(this.CUST_KEY);
      const storedTokens = await AsyncStorage.getItem(this.TOKEN_KEY);
      const storedUser = await AsyncStorage.getItem(this.USER_KEY);

      if (storedTokens && storedUser) {
        const tokens: AuthTokens = JSON.parse(storedTokens);
        const user: User = JSON.parse(storedUser);

        // Check if token is still valid
        if (this.isTokenValid(tokens)) {
          this.tokensSubject.next(tokens);
          this.userSubject.next(user);
          this.isAuthenticated$.next(true);
        } else {
          // Token expired, clear storage
          await this.clearStorage();
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      await this.clearStorage();
    }
  }

  private setupModulePermissions(): void {
    this.modulePermissions.set('booking', {
      moduleId: 'booking',
      permissions: ['booking.read', 'booking.write', 'booking.delete'],
      roles: ['user', 'admin', 'manager'],
      apiEndpoint: 'http://localhost:9000/api',
    });

    this.modulePermissions.set('shopping', {
      moduleId: 'shopping',
      permissions: ['shopping.read', 'shopping.write'],
      roles: ['user', 'admin'],
      apiEndpoint: 'http://localhost:9001/api',
    });

    this.modulePermissions.set('dashboard', {
      moduleId: 'dashboard',
      permissions: ['dashboard.read', 'dashboard.analytics'],
      roles: ['admin', 'manager'],
      apiEndpoint: 'http://localhost:9002/api',
    });

    this.modulePermissions.set('auth', {
      moduleId: 'auth',
      permissions: ['auth.read', 'auth.write'],
      roles: ['user', 'admin', 'manager'],
      apiEndpoint: 'http://localhost:9003/api',
    });
  }

  async login(enrollmentData: EnrollmentRequest): Promise<void> {
    try {
      const apiService = APIService.getInstance();

      // Create a Maya client with the specific base URL
      apiService.createModuleClient(
        'maya',
        'https://uat-maya.maybank.com.my'
      );

      // Headers are handled automatically by APIService based on moduleId
      const response = await apiService.makeAuthorizedCall(
        'maya',
        'post',
        '/v2/enrollment?module=home',
        enrollmentData,
        {} // No need to pass headers - they're added automatically by APIService
      );


      const tokens: AuthTokens = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        expiresAt: response.expiresAt,
      };

      console.log('tokens', tokens);

      await this.setTokens(tokens);
    } catch (error) {
      console.log("errorerror", error)
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async signUp(signUpData: SignUpData): Promise<void> {
    try {
      if (signUpData.password !== signUpData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...userData } = signUpData;

      const response = await fetch('https://your-auth-api.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      const tokens: AuthTokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
      };

      await this.setTokens(tokens);
    } catch (error) {
      throw new Error(`Sign up failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async logout(): Promise<void> {
    try {
      const tokens = this.tokensSubject.value;
      if (tokens?.refreshToken) {
        // Invalidate token on server
        await fetch('https://your-auth-api.com/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({ refreshToken: tokens.refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await this.clearStorage();
    }
  }

  private async setTokens(tokens: AuthTokens): Promise<void> {
    await AsyncStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
    this.tokensSubject.next(tokens);
    this.isAuthenticated$.next(true);

    // const user = this.decodeUser(tokens.accessToken);
    // this.userSubject.next(user);
    // await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private decodeUser(token: string): User {
    try {
      const decoded: any = jwtDecode(token);
      return {
        id: decoded.sub || decoded.id,
        email: decoded.email,
        name: decoded.name,
        roles: decoded.roles || ['user'],
        permissions: decoded.permissions || [],
        modules: this.getAvailableModules(decoded.roles || ['user'], decoded.permissions || []),
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      throw new Error('Invalid token format');
    }
  }

  private getAvailableModules(userRoles: string[], userPermissions: string[]): string[] {
    const availableModules: string[] = [];

    for (const [moduleId, moduleConfig] of this.modulePermissions.entries()) {
      const hasRole = moduleConfig.roles.some(role => userRoles.includes(role));
      const hasPermission = moduleConfig.permissions.some(perm => userPermissions.includes(perm));

      if (hasRole || hasPermission) {
        availableModules.push(moduleId);
      }
    }

    return availableModules;
  }

  private isTokenValid(tokens: AuthTokens): boolean {
    if (!tokens.expiresAt) {
      return false;
    }
    return Date.now() < tokens.expiresAt;
  }

  private async clearStorage(): Promise<void> {
    await Promise.all([
      AsyncStorage.removeItem(this.TOKEN_KEY),
      AsyncStorage.removeItem(this.USER_KEY),
    ]);

    this.tokensSubject.next(null);
    this.userSubject.next(null);
    this.isAuthenticated$.next(false);
  }

  // Compatibility methods for existing code
  async getCredentials(): Promise<string | null> {
    const tokens = this.tokensSubject.value;
    return tokens?.accessToken || null;
  }

  async setCredentials(token: string): Promise<void> {
    // Simple token format for backward compatibility
    const tokens: AuthTokens = {
      accessToken: token,
      refreshToken: '',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };
    await this.setTokens(tokens);
  }

  async removeCredentials(): Promise<void> {
    await this.clearStorage();
  }

  // New methods for enhanced functionality
  canAccessModule(moduleId: string): boolean {
    const user = this.userSubject.value;
    return user?.modules.includes(moduleId) || false;
  }

  hasPermission(permission: string): boolean {
    const user = this.userSubject.value;
    return user?.permissions.includes(permission) || false;
  }

  hasRole(role: string): boolean {
    const user = this.userSubject.value;
    return user?.roles.includes(role) || false;
  }

  getModulePermissions(moduleId: string): ModulePermission | undefined {
    return this.modulePermissions.get(moduleId);
  }

  getCurrentTokens(): AuthTokens | null {
    return this.tokensSubject.value;
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticated$.value;
  }

  async refreshAccessToken(): Promise<AuthTokens> {
    const currentTokens = this.tokensSubject.value;
    if (!currentTokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch('https://your-auth-api.com/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: currentTokens.refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const newTokens: AuthTokens = await response.json();
      await this.setTokens(newTokens);
      return newTokens;
    } catch (error) {
      await this.clearStorage();
      throw error;
    }
  }

  // Get user profile with fresh data
  async getUserProfile(): Promise<User> {
    const tokens = this.getCurrentTokens();
    if (!tokens) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch('https://your-auth-api.com/profile', {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await response.json();
      const user: User = {
        ...userData,
        modules: this.getAvailableModules(userData.roles || [], userData.permissions || []),
      };

      this.userSubject.next(user);
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update user profile
  async updateUserProfile(updates: Partial<Pick<User, 'name' | 'email'>>): Promise<User> {
    const tokens = this.getCurrentTokens();
    if (!tokens) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch('https://your-auth-api.com/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await this.getUserProfile();
    } catch (error) {
      throw new Error(`Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default AuthService;
