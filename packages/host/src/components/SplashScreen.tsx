import React from 'react';
import {StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {useTheme, ProgressBar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import assets from "../assets";

const SplashScreen = () => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    screen: {
        // alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    icon: {
      textAlign: 'center',
    },
    text: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      fontSize: 24,
      color: colors.primary20,
      textAlign: 'center',
    },
    progress: {
      marginVertical: 16,
      marginHorizontal: 32,
    },
  });
  
  return (
     <ImageBackground
            style={styles.screen}
            resizeMode="cover"
            source={assets.branding.splashScreen}>
      <SafeAreaView style={styles.container}>
        <Icon
          style={styles.icon}
          size={56}
          color={colors.primary20}
          name="cloud"
        />
        <Text style={styles.text}>
          Host application is loading. Please wait...
        </Text>
        <ProgressBar
          style={styles.progress}
          indeterminate
          color={colors.primary50}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SplashScreen;
