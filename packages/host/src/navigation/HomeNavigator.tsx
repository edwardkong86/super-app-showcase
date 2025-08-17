import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Home2Screen from '../screens/Home2Screen';
import NavBar from '../components/NavBar';
import UpcomingScreen from '../screens/UpcomingScreen';

export type HomeStackParamList = {
  Home: undefined;
  Upcoming: undefined;
  Home2: undefined;
};

const Home = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
      }}>
      <Home.Screen name="Home2" component={Home2Screen} options={{ headerShown: false }} />
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="Upcoming" component={UpcomingScreen} />
    </Home.Navigator>
  );
};

export default HomeNavigator;
