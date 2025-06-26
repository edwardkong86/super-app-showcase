import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { withTheme, MD3Theme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  children: React.ReactNode;
  name: string;
  theme: MD3Theme; // Injected by withTheme
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  name: string;

  constructor(props: Props) {
    super(props);
    this.name = props.name;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { colors } = this.props.theme;

    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles(colors).container}>
          <Icon size={96} color={colors.primary20} name="alert-octagon" />
          <Text style={styles(colors).text}>{`Failed to load ${this.name}`}</Text>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

// Make styles a function that accepts colors
const styles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 24,
    color: colors.primary20,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default withTheme(ErrorBoundary);
