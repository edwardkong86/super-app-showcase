import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountNavigator from './AccountNavigator';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';

export type TabsParamList = {
  HomeNavigator: undefined;
  SearchNavigator: undefined;
  AccountNavigator: undefined;
};

const homeIcon = Icon.getImageSourceSync('home', 24);
const magnifyIcon = Icon.getImageSourceSync('magnify', 24);
const accountIcon = Icon.getImageSourceSync('account', 24);

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tabs.Navigator
      translucent={false}
      tabBarActiveTintColor={colors.primary50}
      barTintColor={colors.primary95}>
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => homeIcon,
        }}
      />
      <Tabs.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          title: 'Search',
          tabBarIcon: () => magnifyIcon,
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: () => accountIcon,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
