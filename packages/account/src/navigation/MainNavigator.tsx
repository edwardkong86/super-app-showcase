import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountHomeScreen from '../screens/AccountHomeScreen';
import AccountDashboardScreen from '../screens/AccountDashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  AccountDashboard: undefined;
  AccountHome: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountDashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="AccountDashboard"
        component={AccountDashboardScreen}
        options={{
          title: 'Account',
          // headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="AccountHome"
        component={AccountHomeScreen}
        options={{
          title: 'Account',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;