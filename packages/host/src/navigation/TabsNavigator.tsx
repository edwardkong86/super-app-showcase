import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './HomeNavigator';
import ServicesNavigator from './ServicesNavigator';
import AccountNavigator from './AccountNavigator';
import { Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,Text, 
  View } from 'react-native';
import { Typo } from '@mss-engineering/mbb-ui-kit';

export type TabsParamList = {
  HomeNavigator: undefined;
  ServicesNavigator: undefined;
  ScanAndPayNavigator: undefined;
  AccountNavigator: undefined;
  ApplyNavigator: undefined;
};

const homeIcon = Icon.getImageSourceSync('home', 24);
const compassIcon = Icon.getImageSourceSync('safe-square-outline', 24);
const scanIcon = Icon.getImageSourceSync('qrcode-scan', 24);
const accountIcon = Icon.getImageSourceSync('chart-areaspline', 24);
const documentIcon = Icon.getImageSourceSync('application-edit-outline', 24);

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdow: {
      shadowColor: '#DDDDDD',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
    },
    bottomBar: {},
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      bottom: 18,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: 'gray',
    },
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 30,
      height: 30,
    },
    screen1: {
      flex: 1,
      backgroundColor: '#BFEFFF',
    },
    screen2: {
      flex: 1,
      backgroundColor: '#FFEBCD',
    },
  });

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home';
        break;
      case 'Accounts':
        icon = 'safe-square-outline';
        break;
      case 'Expenses':
          icon = 'chart-areaspline';
          break;
      case 'Apply':
          icon = 'application-edit-outline';
          break;
    }

    return (
      <Icon
        name={icon}
        size={25}
        color={routeName === selectedTab ? colors.primary : 'gray'}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
        <Typo size={10} style={{lineHeight:14}} color={routeName === selectedTab ? colors.primary : 'gray'} weight="600">{routeName}</Typo>
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={65}
        circleWidth={50}
        bgColor="#252629"
        initialRouteName="Home"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          // <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.btnCircleUp}
              onPress={() => Alert.alert('Click Action')}
            >
              <Icon name={'qrcode-scan'} color="gray" size={25} />
              <Typo size={10} style={{lineHeight:14}} color="gray" weight="600">Scan</Typo>
            </TouchableOpacity>
          // </Animated.View>
        )}
        tabBar={renderTabBar}
        screenOptions={{headerShown: false}}
        
      >
        <CurvedBottomBar.Screen
          name="Home"
          position="LEFT"
          component={HomeNavigator}
        />
        <CurvedBottomBar.Screen
          name="Accounts"
          position="LEFT"
          component={ServicesNavigator}
        />
        <CurvedBottomBar.Screen
          name="Expenses"
          component={ServicesNavigator}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="Apply"
          component={ServicesNavigator}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
  )

  return (
    <Tabs.Navigator
      translucent={false}
      tabBarActiveTintColor={colors.primary50}
      barTintColor={colors.primary95}
      >
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => homeIcon,
        }}
      />
      <Tabs.Screen
        name="ServicesNavigator"
        component={ServicesNavigator}
        options={{
          title: 'Services',
          tabBarIcon: () => compassIcon,
        }}
      />
      <Tabs.Screen
        name="ScanAndPayNavigator"
        component={ServicesNavigator}
        options={{
          title: 'Scan',
          tabBarIcon: () => scanIcon,
          tabBarButton: ({children, onPress}: {children: any, onPress: any}) => (
            <TouchableOpacity style={{ 
              borderRadius: 24,
              paddingHorizontal: 24,
              paddingVertical: 10, 
              backgroundColor: "#FFC600"
            }} onPress={onPress}>
              {children}
            </TouchableOpacity>
          )
        } as any}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: () => accountIcon,
        }}
      />
      <Tabs.Screen
        name="ApplyNavigator"
        component={AccountNavigator}
        options={{
          title: 'Apply',
          tabBarIcon: () => documentIcon,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;

