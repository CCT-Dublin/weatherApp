import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const WeatherCard = ({ weather, onPress }) => {
  const { theme } = useContext(ThemeContext);
  
  if (!weather) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: theme.card }]}>
        <Card.Content>
          <View style={styles.header}>
            <View>
              <Title style={{ color: theme.text }}>{weather.city}, {weather.country}</Title>
              <Paragraph style={{ color: theme.text }}>{weather.date} • {weather.time}</Paragraph>
            </View>
            <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons name="chevron-right" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.weatherInfo}>
            <View style={styles.temperatureContainer}>
              <Text style={[styles.temperature, { color: theme.text }]}>{weather.temperature}°C</Text>
              <Text style={[styles.feelsLike, { color: theme.text }]}>
                Feels like {weather.feelsLike}°C
              </Text>
            </View>
            
            <View style={styles.iconContainer}>
              <Image source={{ uri: weather.iconUrl }} style={styles.weatherIcon} />
              <Text style={[styles.description, { color: theme.text }]}>
                {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="water-percent" size={22} color={theme.text} />
              <Text style={[styles.detailText, { color: theme.text }]}>{weather.humidity}%</Text>
              <Text style={[styles.detailLabel, { color: theme.text }]}>Humidity</Text>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="weather-windy" size={22} color={theme.text} />
              <Text style={[styles.detailText, { color: theme.text }]}>{weather.windSpeed} m/s</Text>
              <Text style={[styles.detailLabel, { color: theme.text }]}>Wind</Text>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="gauge" size={22} color={theme.text} />
              <Text style={[styles.detailText, { color: theme.text }]}>{weather.pressure} hPa</Text>
              <Text style={[styles.detailLabel, { color: theme.text }]}>Pressure</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  detailLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default WeatherCard;
