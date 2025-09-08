import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './HomeNavigator';
import ServicesNavigator from './ServicesNavigator';
import AccountNavigator from './AccountNavigator';
import { 
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export type TabsParamList = {
  HomeNavigator: undefined;
  AccountNavigator: undefined;
  ScanAndPayNavigator: undefined;
  InteractNavigator: undefined;
  MenuNavigator: undefined;
};

// const homeIcon = Icon.getImageSourceSync('home', 24);
// const accountsIcon = Icon.getImageSourceSync('safe-square-outline', 24);
// const scanIcon = Icon.getImageSourceSync('qrcode-scan', 24);
// const interactIcon = Icon.getImageSourceSync('account-group', 24);
// const menuIcon = Icon.getImageSourceSync('menu', 24);

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


  // return (
  //   <CurvedBottomBar.Navigator
  //       type="DOWN"
  //       style={styles.bottomBar}
  //       shadowStyle={styles.shawdow}
  //       height={65}
  //       circleWidth={50}
  //       bgColor="#252629"
  //       initialRouteName="Home"
  //       borderTopLeftRight
  //       renderCircle={({ selectedTab, navigate }) => (
  //         // <Animated.View style={styles.btnCircleUp}>
  //           <TouchableOpacity
  //             style={styles.btnCircleUp}
  //             onPress={() => Alert.alert('Click Action')}
  //           >
  //             <Icon name={'qrcode-scan'} color="gray" size={25} />
  //             <Typo size={10} style={{lineHeight:14}} color="gray" weight="600">Scan</Typo>
  //           </TouchableOpacity>
  //         // </Animated.View>
  //       )}
  //       tabBar={renderTabBar}
  //       screenOptions={{headerShown: false}}
        
  //     >
  //       <CurvedBottomBar.Screen
  //         name="Home"
  //         position="LEFT"
  //         component={HomeNavigator}
  //       />
  //       <CurvedBottomBar.Screen
  //         name="Accounts"
  //         position="LEFT"
  //         component={AccountNavigator}
  //       />
  //       <CurvedBottomBar.Screen
  //         name="Expenses"
  //         component={ServicesNavigator}
  //         position="RIGHT"
  //       />
  //       <CurvedBottomBar.Screen
  //         name="Apply"
  //         component={ServicesNavigator}
  //         position="RIGHT"
  //       />
  //     </CurvedBottomBar.Navigator>
  // )

  return (
    <Tabs.Navigator
      translucent={false}
      tabBarActiveTintColor="#FFC600"
      >
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => Icon.getImageSourceSync('home', 24),
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Accounts',
          tabBarIcon: () => Icon.getImageSourceSync('account-multiple', 24),
        }}
      />
      <Tabs.Screen
        name="ScanAndPayNavigator"
        component={ServicesNavigator}
        options={{
          title: 'Scan',
          tabBarIcon: () => Icon.getImageSourceSync('qrcode-scan', 24),
        }}
      />
      <Tabs.Screen
        name="InteractNavigator"
        component={ServicesNavigator}
        options={{
          title: 'Interact',
          tabBarIcon: () => Icon.getImageSourceSync('account-group', 24),
        }}
      />
      <Tabs.Screen
        name="MenuNavigator"
        component={AccountNavigator}
        options={{
          title: 'Menu',
          tabBarIcon: () => Icon.getImageSourceSync('menu', 24),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;

