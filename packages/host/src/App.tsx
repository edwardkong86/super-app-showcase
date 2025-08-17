import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme, DarkTheme, MD3Colors } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';

const AuthProvider = React.lazy(() => import('auth/AuthProvider'));
const SignInScreen = React.lazy(() => import('auth/SignInScreen'));


const palette = {
    // Keep your existing secondary/tertiary/neutral palettes
    ...MD3Colors, 
    primary100: '#FFFFFF',
    primary99: '#FFFEFB',
    primary95: '#FFF9ED',
    primary90: '#FFF4DF',
    primary80: '#FFE8BF',
    primary70: '#FFDDA0',
    primary60: '#FFD180',
    primary50: '#FFC660', // Slightly desaturated
    primary40: '#FFC600', // Your base color
    primary30: '#E6B200',
    primary20: '#CC9E00',
    primary10: '#B38A00',
    primary0: '#000000',
    // neutralVariant100: '#FFFFFF',    // Pure white
    // neutralVariant99: '#FFFEFB',    // Near white with subtle warmth
    // neutralVariant95: '#FFF9ED',    // Very light warm gray
    // neutralVariant90: '#FFF4DF',    // Light warm gray
    // neutralVariant80: '#FFE8BF',    // Light medium warm gray
    // neutralVariant70: '#FFDDA0',    // Medium warm gray
    // neutralVariant60: '#FFD180',    // Medium gray with warm undertone
    // neutralVariant50: '#FFC660',    // Medium-dark warm gray
    // neutralVariant40: '#FFC600',    // Base neutral variant (now a warm gray)
    // neutralVariant30: '#E6B200',    // Dark warm gray
    // neutralVariant20: '#CC9E00',    // Very dark warm gray
    // neutralVariant10: '#B38A00',    // Near-black warm tone
    // neutralVariant0: '#000000',     // Pure black
};
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
    primary: palette.primary40,
    primaryContainer: palette.primary90,
    surface: palette.primary40,
    surfaceVariant: palette.primary90,
    onPrimaryContainer: '#000000', 
    secondaryContainer: palette.primary40, // Your custom tonal color
    onSecondaryContainer: '#000000', // Custom text color
    accent: '#03dac4',
    background: '#f6f6f6',
    text: '#000000',
  },
};

const App = () => {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={customTheme}>
        <ErrorBoundary name="AuthProvider">
          <React.Suspense fallback={<SplashScreen />}>
            <AuthProvider>
              {(authData: { isAuthenticated: boolean; isLoading: boolean }) => {
                if (authData.isLoading) {
                  return <SplashScreen />;
                }

                // if (!authData.isAuthenticated) {
                //   return (
                //     <React.Suspense fallback={<SplashScreen />}>
                //       <SignInScreen />
                //     </React.Suspense>
                //   );
                // }

                return (
                  <NavigationContainer
                    onReady={() => RNBootSplash.hide({ fade: true })}>
                    <MainNavigator />
                  </NavigationContainer>
                );
              }}
            </AuthProvider>
          </React.Suspense>
        </ErrorBoundary>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
