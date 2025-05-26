import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const DailyHighlights = ({ forecast }) => {
  const { theme } = useContext(ThemeContext);
  
  if (!forecast || !forecast.length) {
    return null;
  }
  
  // Calculate averages and extremes
  const avgHumidity = Math.round(forecast.reduce((sum, item) => sum + item.humidity, 0) / forecast.length);
  const avgWindSpeed = Math.round(forecast.reduce((sum, item) => sum + item.windSpeed, 0) / forecast.length * 10) / 10;
  const maxWindSpeed = Math.max(...forecast.map(item => item.windSpeed));
  const avgPressure = Math.round(forecast.reduce((sum, item) => sum + item.pressure, 0) / forecast.length);
  
  return (
    <Card style={[styles.card, { backgroundColor: theme.card }]}>
      <Card.Content>
        <Text style={[styles.title, { color: theme.text }]}>Daily Highlights</Text>
        
        <View style={styles.highlightsContainer}>
          <View style={[styles.highlightItem, { backgroundColor: theme.background }]}>
            <MaterialCommunityIcons name="water-percent" size={24} color={theme.primary} />
            <Text style={[styles.highlightValue, { color: theme.text }]}>{avgHumidity}%</Text>
            <Text style={[styles.highlightLabel, { color: theme.secondary }]}>Humidity</Text>
          </View>
          
          <View style={[styles.highlightItem, { backgroundColor: theme.background }]}>
            <MaterialCommunityIcons name="weather-windy" size={24} color={theme.primary} />
            <Text style={[styles.highlightValue, { color: theme.text }]}>{avgWindSpeed} m/s</Text>
            <Text style={[styles.highlightLabel, { color: theme.secondary }]}>Avg Wind</Text>
            <Text style={[styles.highlightSubValue, { color: theme.text }]}>Max: {maxWindSpeed} m/s</Text>
          </View>
          
          <View style={[styles.highlightItem, { backgroundColor: theme.background }]}>
            <MaterialCommunityIcons name="gauge" size={24} color={theme.primary} />
            <Text style={[styles.highlightValue, { color: theme.text }]}>{avgPressure}</Text>
            <Text style={[styles.highlightLabel, { color: theme.secondary }]}>Pressure (hPa)</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  highlightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  highlightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  highlightLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  highlightSubValue: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default DailyHighlights;
