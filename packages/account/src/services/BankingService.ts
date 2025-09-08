import APIService from 'auth/APIService';
import { AuthContextType } from 'auth/AuthContext';

export interface BankingSummaryResponse {
  // Add proper typing based on actual API response
  accounts?: any[];
  accountListings?: any[];
  totalBalance?: number;
  // Add other fields as needed
}

export interface BankingAccount {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  currency: string;
  lastTransaction?: string;
  isPrimary?: boolean;
}

class BankingService {
  private static instance: BankingService;
  private apiService: APIService;
  private authContext: AuthContextType | null = null;

  private constructor() {
    this.apiService = APIService.getInstance();
    console.log("BankingService", this.apiService)
  }

  setAuthContext(authContext: AuthContextType) {
    this.authContext = authContext;
  }

  static get shared(): BankingService {
    if (!BankingService.instance) {
      BankingService.instance = new BankingService();
    }
    return BankingService.instance;
  }

  async getBankingSummary(type: string = 'A', checkMae: boolean = true): Promise<BankingSummaryResponse> {
    try {
      // Get the current token from AuthProvider
      if (!this.authContext) {
        throw new Error('AuthContext not available');
      }
      
      const currentToken = this.authContext.getCurrentTokens();
      if (!currentToken?.accessToken) {
        throw new Error('No authentication token available');
      }

      // Create Maya client with proper base URL
      this.apiService.createModuleClient(
        'maya-banking',
        'https://uat-maya.maybank.com.my'
      );

      console.log("getBankingSummary", "Headers will be added by APIService automatically")

      // Make API call using makeAuthorizedCall - headers are handled automatically by moduleId
      const response = await this.apiService.makeAuthorizedCall(
        'maya-banking',
        'get',
        '/banking/v1/summary?type=A&checkMae=true',
        undefined,
        {} // No need to pass headers - they're added automatically by APIService
      );

      return response as BankingSummaryResponse;
    } catch (error) {
      console.error('Banking summary API error:', error);
      throw new Error(`Failed to fetch banking summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Parse API response to standardized account format
  parseAccountsFromResponse(response: BankingSummaryResponse): BankingAccount[] {
    if (!response.accountListings) {
      return [];
    }

    // This would need to be adjusted based on actual API response structure
    return response.accountListings.map((account: any, index: number) => ({
      id: account.id || `account_${index}`,
      name: account.name || account.accountName || 'Unknown Account',
      type: account.type || account.accountType || 'Account',
      accountNumber: account.accountNumber || account.number || '',
      balance: parseFloat(account.balance || account.currentBalance || '0'),
      currency: account.currency || 'MYR',
      lastTransaction: account.lastTransaction || account.lastTransactionDate,
      isPrimary: account.isPrimary || index === 0,
    }));
  }

  // Format balance for display
  formatCurrency(amount: number, currency: string = 'MYR'): string {
    const formatter = new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    });
    
    // Convert to RM format that matches the existing UI
    return formatter.format(amount).replace('MYR', 'RM');
  }
}

export default BankingService;