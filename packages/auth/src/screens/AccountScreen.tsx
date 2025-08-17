import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const AccountScreen = () => {
  const { signOut, user, isLoading } = useAuth();
  const { colors } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 16,
    },
  });
  return (
    <View style={styles.container}>
      {user && (
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text variant="headlineSmall">Welcome!</Text>
          {user.name && <Text variant="bodyLarge">{user.name}</Text>}
          <Text variant="bodyMedium">{user.email}</Text>
          <Text variant="bodySmall">Roles: {user.roles.join(', ')}</Text>
        </View>
      )}
      <Pressable
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleSignOut}
        disabled={isLoading}
      >
        <Text style={{ color: 'white' }}>
          {isLoading ? 'Signing out...' : 'Logout'}
        </Text>
      </Pressable>
    </View>
  );
};



export default AccountScreen;
