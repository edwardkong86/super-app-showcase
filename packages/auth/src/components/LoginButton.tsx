import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

interface LoginButtonProps {
  title?: string;
  style?: any;
  textStyle?: any;
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  title = 'Login', 
  style,
  textStyle 
}) => {
  const { showSignIn, isAuthenticated, currentScope } = useAuth();

  // if (isAuthenticated) {
  //   return null; // Don't show login button if already authenticated
  // }

  return (
    <Pressable 
      style={[styles.button, style]} 
      onPress={showSignIn}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginButton;