import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const SignInScreen = () => {
  const {signIn} = useAuth();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeHeadline: {
      color: colors.primary20,
    },
    welcomeText: {
      padding: 16,
      paddingBottom: 32,
    },
    button: {
      backgroundColor: colors.primary90,
      padding: 16,
      borderRadius: 16,
    },
  });
  
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.welcomeHeadline}>
        Welcome!
      </Text>
      <Text style={styles.welcomeText} variant="bodyLarge">
        This is a dummy login screen. Just press the button and have a look
        around this super app 🚀
      </Text>
      <Pressable style={styles.button} onPress={signIn}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};



export default SignInScreen;
