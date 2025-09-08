import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', style: 'destructive', onPress: () => console.log('Logout confirmed')},
      ]
    );
  };

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        {
          title: 'Push Notifications',
          type: 'switch',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          title: 'Biometric Login',
          type: 'switch',
          value: biometricEnabled,
          onValueChange: setBiometricEnabled,
        },
        {
          title: 'Dark Mode',
          type: 'switch',
          value: darkModeEnabled,
          onValueChange: setDarkModeEnabled,
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          title: 'Change PIN',
          type: 'button',
          onPress: () => console.log('Change PIN pressed'),
        },
        {
          title: 'Two-Factor Authentication',
          type: 'button',
          onPress: () => console.log('2FA pressed'),
        },
        {
          title: 'Trusted Devices',
          type: 'button',
          onPress: () => console.log('Trusted Devices pressed'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          type: 'button',
          onPress: () => console.log('Help Center pressed'),
        },
        {
          title: 'Contact Support',
          type: 'button',
          onPress: () => console.log('Contact Support pressed'),
        },
        {
          title: 'Privacy Policy',
          type: 'button',
          onPress: () => console.log('Privacy Policy pressed'),
        },
        {
          title: 'Terms of Service',
          type: 'button',
          onPress: () => console.log('Terms of Service pressed'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.settingItem}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                {item.type === 'switch' && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{false: '#e9ecef', true: '#007AFF'}}
                    thumbColor={item.value ? '#ffffff' : '#ffffff'}
                  />
                )}
                {item.type === 'button' && (
                  <TouchableOpacity onPress={item.onPress}>
                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Account Module v1.0.0</Text>
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
  section: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  settingTitle: {
    fontSize: 16,
    color: '#333333',
  },
  chevron: {
    fontSize: 20,
    color: '#cccccc',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#999999',
  },
});

export default SettingsScreen;