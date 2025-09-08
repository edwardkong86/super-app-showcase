import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

// Scope mapping: 0 = PREONBOARD, 1 = PRELOGIN, 2 = TOUCHID, 3 = LOGIN
const SCOPE = {
  PREONBOARD: 0 as const,
  PRELOGIN: 1 as const, 
  TOUCHID: 2 as const,
  LOGIN: 3 as const,
};

const mobileSDKData = {
  "deviceDetail": "iOS",
  "deviceId": "iPhone12,1",
  "deviceModel": "iPhone 11",
  "deviceName": "iPhone",
  "devicePrint": "string",
  "osType": "ios",
  "osVersion": "18.6.1",
  "rsaKey": "B9C772174A644329639DDFA37BDF4687",
  "hardwareID": "EAC41DA8-BAC3-4A41-8518-540E72D8824C",
  "screenSize": "414 x 896",
  "languages": "en-MY",
  "multitaskingSupported": true,
  "timestamp": "2025-09-02T09:33:40Z",
  "geoLocationInfo": {
    "Latitude": "3.14734041",
    "Longitude": "101.69957975",
    "Status": "0",
    "Timestamp": "1756805620846",
    "HorizontalAccuracy": "8.49982687"
  },
  "emulator": 0,
  "osId": "D41557E7-C23E-4CFE-875E-AF4E28046FDF",
  "compromised": 0,
  "sdkVersion": "6.1.0",
  "appState": "inactive",
  "keyChainErrorOnStoring": "Success",
  "keyChainErrorOnRetrieve": "Success",
  "phoneCallStatus": "0"
};

const SignInScreen = () => {
  const { signIn, handleStepL2, handleStepL3, isLoading, error, hideSignIn, currentScope, clearError, setCurrentScope } = useAuth();
  const { colors } = useTheme();

  const handleSignIn = async () => {
    try {
      const enrollmentData = {
        "grantType": "PASSWORD",
        "tokenType": "PRELOGIN",
        "customerKey": "U2FsdGVkX19BQKypS9g6yPZ6RFsyyU41GCQyJe3AsF6C/pFwG+C6MN8/Sc4VfHICoqoA5CUpNBGPWKhv85x7Zw==",
        mobileSDKData,
        "limitApproved": false,
        "marketing": false,
        "showBalanceDashboard": false,
        "userDashboard": null,
        "fromModule": "home"
      };
      switch(currentScope){
        case SCOPE.PRELOGIN: // 1
          await handleStepL2(enrollmentData);
          break;
        case SCOPE.TOUCHID: // 2
          await handleStepL3(enrollmentData);
          break;
        case SCOPE.LOGIN: // 3
          console.log('Authentication already completed');
          break;
        default: // 0 - PREONBOARD
          await signIn(enrollmentData);
          break;  
      }

    } catch (err) {
      console.error('Login flow failed:', err);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeHeadline: {
      color: colors.primary,
    },
    welcomeText: {
      padding: 16,
      paddingBottom: 32,
      textAlign: 'center',
    },
    stepContainer: {
      backgroundColor: '#f0f0f0',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    stepText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.primary,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 16,
    },
    closeButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 20,
    },
    closeButtonText: {
      fontSize: 18,
      color: '#000',
    },
    errorContainer: {
      backgroundColor: '#ffebee',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      alignItems: 'center',
    },
    errorText: {
      color: '#d32f2f',
      marginBottom: 8,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: '#d32f2f',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
    },
    retryButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <Pressable style={styles.closeButton} onPress={hideSignIn}>
        <Text style={styles.closeButtonText}>✕</Text>
      </Pressable>

      <Text variant="headlineMedium" style={styles.welcomeHeadline}>Maya Bank Login</Text>
      
      {/* Step Indicator */}
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>
          Scope: {currentScope === 0 ? 'Pre-Onboard' : 
                currentScope === 1 ? 'Pre-Login' : 
                currentScope === 2 ? 'Bio Metric / Pin' :
                currentScope === 3 ? 'Password' : 'Unknown'}
        </Text>
      </View>

      <Text style={styles.welcomeText} variant="bodyLarge">
        {currentScope === 0 && 'Ready to start Maya Bank authentication...'}
        {currentScope === 1 && 'Initializing secure connection...'}
        {currentScope === 2 && 'Authenticating with biometrics...'}
        {currentScope === 3 && 'Completing login process...'}
      </Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable 
            style={styles.retryButton} 
            onPress={() => {
              // Clear error and reset to initial scope
              clearError && clearError();
              setCurrentScope && setCurrentScope(SCOPE.PREONBOARD);
            }}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      )}
      <Pressable
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        <Text style={{ color: 'white' }}>
          {isLoading ? 'Processing...' :
           currentScope === 0 ? 'Start Maya Login' :
           currentScope === 1 ? 'Continue to TouchID' :
           currentScope === 2 ? 'Complete Login' :
           currentScope === 3 ? 'Login Complete' : 'Continue'}
        </Text>
      </Pressable>
    </View>
  );
};



export default SignInScreen;
