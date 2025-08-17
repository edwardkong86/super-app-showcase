import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const SignInScreen = () => {
  const { signIn, isLoading, error, hideSignIn } = useAuth();
  const { colors } = useTheme();

  const handleSignIn = async () => {
    try {
      // Demo credentials for testing
      await signIn({
        email: 'demo@maybank.com',
        password: 'demo123',
      });
    } catch (err) {
      // Error is already handled by AuthProvider
      console.error('Sign in failed:', err);
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
  });

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <Pressable style={styles.closeButton} onPress={hideSignIn}>
        <Text style={styles.closeButtonText}>✕</Text>
      </Pressable>

      <Text variant="headlineMedium" style={styles.welcomeHeadline}>
        Welcome!
      </Text>
      <Text style={styles.welcomeText} variant="bodyLarge">
        This is a dummy login screen. Just press the button and have a look
        around this super app 🚀
      </Text>
      {error && (
        <Text style={{ color: 'red', marginBottom: 16 }}>
          {error}
        </Text>
      )}
      <Pressable
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        <Text style={{ color: 'white' }}>
          {isLoading ? 'Signing in...' : 'Login'}
        </Text>
      </Pressable>
    </View>
  );
};



export default SignInScreen;
