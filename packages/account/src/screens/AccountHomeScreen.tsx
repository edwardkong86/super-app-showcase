import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/MainNavigator';

type AccountHomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AccountHome'
>;

const AccountHomeScreen = () => {
  const navigation = useNavigation<AccountHomeScreenNavigationProp>();

  const menuItems = [
    {
      title: 'Profile',
      subtitle: 'View and edit your profile',
      onPress: () => navigation.navigate('Profile'),
      icon: '👤',
    },
    {
      title: 'Settings',
      subtitle: 'App preferences and configuration',
      onPress: () => navigation.navigate('Settings'),
      icon: '⚙️',
    },
    {
      title: 'Account Balance',
      subtitle: 'View your current balance',
      onPress: () => console.log('Account Balance pressed'),
      icon: '💰',
    },
    {
      title: 'Transaction History',
      subtitle: 'View your recent transactions',
      onPress: () => console.log('Transaction History pressed'),
      icon: '📊',
    },
    {
      title: 'Security',
      subtitle: 'Manage your security settings',
      onPress: () => console.log('Security pressed'),
      icon: '🔒',
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      onPress: () => console.log('Help & Support pressed'),
      icon: '❓',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to Account</Text>
          <Text style={styles.subtitle}>Manage your account and preferences</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  chevron: {
    fontSize: 20,
    color: '#cccccc',
    fontWeight: 'bold',
  },
});

export default AccountHomeScreen;