import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Module</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  loader: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});

export default SplashScreen;