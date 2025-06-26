import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const AccountScreen = () => {
  const {signOut} = useAuth();
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: colors.primary90,
      padding: 16,
      borderRadius: 16,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={signOut}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};



export default AccountScreen;
