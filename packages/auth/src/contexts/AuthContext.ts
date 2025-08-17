import React from 'react';
import type {
  User,
  LoginCredentials,
  SignUpData,
  AuthTokens,
  ModulePermission,
} from '../services/AuthService';

interface AuthContextType {
  // State
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  showSignInScreen: boolean;

  // Basic auth methods
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (signUpData: SignUpData) => Promise<void>;

  // Enhanced auth methods
  refreshToken: () => Promise<AuthTokens>;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email'>>) => Promise<User>;
  getUserProfile: () => Promise<User>;

  // Permission and module access methods
  canAccessModule: (moduleId: string) => boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  getModulePermissions: (moduleId: string) => ModulePermission | undefined;

  // Utility methods
  clearError: () => void;
  getCurrentTokens: () => AuthTokens | null;
  getCurrentUser: () => User | null;

  // UI Control methods
  showSignIn: () => void;
  hideSignIn: () => void;
}

const defaultAuthContext: AuthContextType = {
  // State
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
  showSignInScreen: false,

  // Basic auth methods
  signIn: async () => {
    throw new Error('AuthProvider not found');
  },
  signOut: async () => {
    throw new Error('AuthProvider not found');
  },
  signUp: async () => {
    throw new Error('AuthProvider not found');
  },

  // Enhanced auth methods
  refreshToken: async () => {
    throw new Error('AuthProvider not found');
  },
  updateProfile: async () => {
    throw new Error('AuthProvider not found');
  },
  getUserProfile: async () => {
    throw new Error('AuthProvider not found');
  },

  // Permission and module access methods
  canAccessModule: () => false,
  hasPermission: () => false,
  hasRole: () => false,
  getModulePermissions: () => undefined,

  // Utility methods
  clearError: () => {},
  getCurrentTokens: () => null,
  getCurrentUser: () => null,

  // UI Control methods
  showSignIn: () => {
    throw new Error('AuthProvider not found');
  },
  hideSignIn: () => {
    throw new Error('AuthProvider not found');
  },
};

const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);

const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth, AuthContext };
export type { AuthContextType };
