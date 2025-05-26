import React, { useContext, useState } from 'react';
import { View, StyleSheet, Switch, Text, TouchableOpacity, ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';

const SettingsScreen = () => {
  const { theme, toggleTheme, themeMode } = useContext(ThemeContext);
  const [clearingData, setClearingData] = useState(false);

  const handleClearData = async () => {
    try {
      setClearingData(true);
      
      // Clear search history
      await AsyncStorage.setItem('searchHistory', JSON.stringify([]));
      
      // Clear favorite locations
      await AsyncStorage.setItem('favoriteLocations', JSON.stringify([]));
      
      // Keep theme settings
      
      setClearingData(false);
    } catch (error) {
      console.error('Error clearing app data:', error);
      setClearingData(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <List.Section>
          <List.Subheader style={{ color: theme.text }}>Appearance</List.Subheader>
          
          <List.Item
            title="Dark Mode"
            titleStyle={{ color: theme.text }}
            description={themeMode === 'system' ? 'Follow system settings' : (themeMode === 'dark' ? 'On' : 'Off')}
            descriptionStyle={{ color: theme.secondary }}
            left={props => (
              <List.Icon 
                {...props} 
                icon={({ size, color }) => (
                  <MaterialCommunityIcons 
                    name={themeMode === 'dark' ? "weather-night" : "weather-sunny"} 
                    size={size} 
                    color={theme.primary} 
                  />
                )} 
              />
            )}
            right={props => (
              <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                <View style={[
                  styles.themeOption, 
                  { 
                    backgroundColor: themeMode === 'light' ? theme.primary : theme.card,
                    borderColor: themeMode === 'light' ? theme.primary : theme.border
                  }
                ]}>
                  <MaterialCommunityIcons name="weather-sunny" size={16} color={themeMode === 'light' ? 'white' : theme.text} />
                </View>
                <View style={[
                  styles.themeOption, 
                  { 
                    backgroundColor: themeMode === 'system' ? theme.primary : theme.card,
                    borderColor: themeMode === 'system' ? theme.primary : theme.border
                  }
                ]}>
                  <MaterialCommunityIcons name="cellphone" size={16} color={themeMode === 'system' ? 'white' : theme.text} />
                </View>
                <View style={[
                  styles.themeOption, 
                  { 
                    backgroundColor: themeMode === 'dark' ? theme.primary : theme.card,
                    borderColor: themeMode === 'dark' ? theme.primary : theme.border
                  }
                ]}>
                  <MaterialCommunityIcons name="weather-night" size={16} color={themeMode === 'dark' ? 'white' : theme.text} />
                </View>
              </TouchableOpacity>
            )}
          />
          
          <Divider style={{ backgroundColor: theme.border }} />
          
          <List.Subheader style={{ color: theme.text }}>Data Management</List.Subheader>
          
          <List.Item
            title="Clear App Data"
            titleStyle={{ color: theme.text }}
            description="Clear search history and favorites"
            descriptionStyle={{ color: theme.secondary }}
            left={props => (
              <List.Icon 
                {...props} 
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="delete-outline" size={size} color={theme.danger} />
                )} 
              />
            )}
            onPress={handleClearData}
            disabled={clearingData}
          />
          
          <Divider style={{ backgroundColor: theme.border }} />
          
          <List.Subheader style={{ color: theme.text }}>About</List.Subheader>
          
          <List.Item
            title="App Version"
            titleStyle={{ color: theme.text }}
            description={`${Application.applicationName} v${Application.nativeApplicationVersion}`}
            descriptionStyle={{ color: theme.secondary }}
            left={props => (
              <List.Icon 
                {...props} 
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="information-outline" size={size} color={theme.info} />
                )} 
              />
            )}
          />
          
          <List.Item
            title="Weather Data"
            titleStyle={{ color: theme.text }}
            description="Powered by OpenWeatherMap"
            descriptionStyle={{ color: theme.secondary }}
            left={props => (
              <List.Icon 
                {...props} 
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="cloud-outline" size={size} color={theme.info} />
                )} 
              />
            )}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
});

export default SettingsScreen;
