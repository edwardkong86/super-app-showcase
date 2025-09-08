import React from 'react';
import type {
  User,
  SignUpData,
  AuthTokens,
  ModulePermission,
  EnrollmentRequest,
} from '../services/AuthService';

type AuthStep = 'PREONBOARD' | 'PRELOGIN' | 'TOUCHID' | 'LOGIN';
type AuthScope = 0 | 1 | 2 | 3;

interface AuthContextType {
  // State
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  showSignInScreen: boolean;
  currentScope: AuthScope;

  // Basic auth methods
  signIn: (enrollmentData: EnrollmentRequest) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (signUpData: SignUpData) => Promise<void>;

  // Scope methods
  handleStepL2: (enrollmentData: EnrollmentRequest) => Promise<void>;
  handleStepL3: (enrollmentData: EnrollmentRequest) => Promise<void>;
  setCurrentScope: (scope: AuthScope) => void;

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
  currentScope: 0 as AuthScope,

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

  // Scope methods
  handleStepL2: async () => {
    throw new Error('AuthProvider not found');
  },
  handleStepL3: async () => {
    throw new Error('AuthProvider not found');
  },
  setCurrentScope: () => {
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
