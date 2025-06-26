import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

type Props = {
  label: string;
  icon: string;
};

const Placeholder: FC<Props> = ({ label, icon }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      color: colors.primary20,
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <Icon size={96} color={colors.primary20} name={icon} />
      <Text style={styles.text}>{label}</Text>
    </SafeAreaView>
  );
};

export default Placeholder;
