import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar, useTheme } from 'react-native-paper';

const NavBar = ({ navigation, back, route, options }: NativeStackHeaderProps) => {
  const { colors } = useTheme();
  return (
    <Appbar.Header elevated style={{ backgroundColor: colors.primary95 }}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title ?? route.name} />
    </Appbar.Header>
  );
};

export default NavBar;
