import React from 'react';
import { Subscription } from 'rxjs';
import AuthService, {
  type User,
  type LoginCredentials,
  type SignUpData,
  type AuthTokens,
} from '../services/AuthService';
import { AuthContext } from '../contexts/AuthContext';

const SignInScreen = React.lazy(() => import('../screens/SignInScreen'));

enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_AUTHENTICATED = 'SET_AUTHENTICATED',
  SET_USER = 'SET_USER',
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SHOW_SIGN_IN = 'SHOW_SIGN_IN',
  HIDE_SIGN_IN = 'HIDE_SIGN_IN',
}

type Action = {
  type: ActionTypes;
  payload?: any;
};

type State = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  showSignInScreen: boolean;
};

const initialState: State = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
  showSignInScreen: false,
};

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...prevState,
        isLoading: action.payload,
      };
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...prevState,
        isAuthenticated: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionTypes.SET_USER:
      return {
        ...prevState,
        user: action.payload,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...prevState,
        error: action.payload,
        isLoading: false,
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...prevState,
        error: null,
      };
    case ActionTypes.SHOW_SIGN_IN:
      return {
        ...prevState,
        showSignInScreen: true,
      };
    case ActionTypes.HIDE_SIGN_IN:
      return {
        ...prevState,
        showSignInScreen: false,
      };
    default:
      return prevState;
  }
};

const AuthProvider = ({
  children,
}: {
  children: (data: State) => React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const authService = React.useMemo(() => AuthService.shared, []);
  const subscriptionsRef = React.useRef<Subscription[]>([]);

  const clearError = React.useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  }, []);

  const authContext = React.useMemo(
    () => ({
      // State
      isLoading: state.isLoading,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      error: state.error,
      showSignInScreen: state.showSignInScreen,

      // Basic auth methods
      signIn: async (credentials: LoginCredentials) => {
        try {
          dispatch({ type: ActionTypes.SET_LOADING, payload: true });
          dispatch({ type: ActionTypes.CLEAR_ERROR });

          await authService.login(credentials);
          // Hide sign in screen on successful login
          dispatch({ type: ActionTypes.HIDE_SIGN_IN });
          // Auth state will be updated via observables
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
          throw error;
        }
      },

      signOut: async () => {
        try {
          dispatch({ type: ActionTypes.SET_LOADING, payload: true });
          await authService.logout();
          // Auth state will be updated via observables
        } catch (error) {
          console.error('Logout error:', error);
          // Still clear local state even if logout fails
          dispatch({ type: ActionTypes.SET_AUTHENTICATED, payload: false });
          dispatch({ type: ActionTypes.SET_USER, payload: null });
        }
      },

      signUp: async (signUpData: SignUpData) => {
        try {
          dispatch({ type: ActionTypes.SET_LOADING, payload: true });
          dispatch({ type: ActionTypes.CLEAR_ERROR });

          await authService.signUp(signUpData);
          // Auth state will be updated via observables
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
          dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
          throw error;
        }
      },

      // Enhanced auth methods
      refreshToken: async (): Promise<AuthTokens> => {
        try {
          return await authService.refreshAccessToken();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Token refresh failed';
          dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
          throw error;
        }
      },

      updateProfile: async (updates: Partial<Pick<User, 'name' | 'email'>>): Promise<User> => {
        try {
          dispatch({ type: ActionTypes.SET_LOADING, payload: true });
          const updatedUser = await authService.updateUserProfile(updates);
          dispatch({ type: ActionTypes.SET_LOADING, payload: false });
          return updatedUser;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
          dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
          throw error;
        }
      },

      getUserProfile: async (): Promise<User> => {
        try {
          return await authService.getUserProfile();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to get profile';
          dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
          throw error;
        }
      },

      // Permission and module access methods
      canAccessModule: (moduleId: string): boolean => {
        return authService.canAccessModule(moduleId);
      },

      hasPermission: (permission: string): boolean => {
        return authService.hasPermission(permission);
      },

      hasRole: (role: string): boolean => {
        return authService.hasRole(role);
      },

      getModulePermissions: (moduleId: string) => {
        return authService.getModulePermissions(moduleId);
      },

      // Utility methods
      clearError,
      getCurrentTokens: (): AuthTokens | null => {
        return authService.getCurrentTokens();
      },

      getCurrentUser: (): User | null => {
        return authService.getCurrentUser();
      },

      // UI Control methods
      showSignIn: () => {
        dispatch({ type: ActionTypes.SHOW_SIGN_IN });
      },

      hideSignIn: () => {
        dispatch({ type: ActionTypes.HIDE_SIGN_IN });
      },
    }),
    [
      state.isLoading,
      state.isAuthenticated,
      state.user,
      state.error,
      state.showSignInScreen,
      authService,
      clearError,
    ],
  );

  // Subscribe to AuthService observables
  React.useEffect(() => {
    const subscriptions: Subscription[] = [];

    // Subscribe to authentication status
    subscriptions.push(
      authService.isAuthenticated$.subscribe(isAuthenticated => {
        dispatch({ type: ActionTypes.SET_AUTHENTICATED, payload: isAuthenticated });
      })
    );

    // Subscribe to user changes
    subscriptions.push(
      authService.user$.subscribe(user => {
        dispatch({ type: ActionTypes.SET_USER, payload: user });
      })
    );

    // Store subscriptions for cleanup
    subscriptionsRef.current = subscriptions;

    // Cleanup function
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [authService]);

  // Initial loading state management
  React.useEffect(() => {
    // Set loading to false after initial auth check
    const timer = setTimeout(() => {
      if (state.isLoading) {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    }, 1000); // Give auth service time to initialize

    return () => clearTimeout(timer);
  }, [state.isLoading]);

  return (
    <AuthContext.Provider value={authContext}>
      {state.showSignInScreen ? (
        <React.Suspense fallback={<></>}>
          <SignInScreen />
        </React.Suspense>
      ) : (
        children(state)
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
