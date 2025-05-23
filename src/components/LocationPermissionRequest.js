import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouachableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const LocationPermissionRequest = ({ onRequestPermission }) => {
    const { theme } = useContext(ThemeContext);
      return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <MaterialCommunityIcons name="map-marker-off" size={64} color={theme.warning} />
      <Text style={[styles.title, { color: theme.text }]}>Location Permission Required</Text>
      <Text style={[styles.message, { color: theme.text }]}>
        This app needs access to your location to show weather information for your current location.
      </Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.primary }]} 
        onPress={onRequestPermission}
      >
        <Text style={styles.buttonText}>Grant Permission</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LocationPermissionRequest;