import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const LocationHeader = ({ city, country, onRefresh }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <MaterialCommunityIcons name="map-marker" size={24} color={theme.primary} />
        <Text style={[styles.locationText, { color: theme.text }]}>
          {city}, {country}
        </Text>
      </View>
      
      <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
        <MaterialCommunityIcons name="refresh" size={24} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  refreshButton: {
    padding: 4,
  },
});

export default LocationHeader;
