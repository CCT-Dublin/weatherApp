import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

const WeatherCard = ({ weather, onPress }) => {
  const { theme } = useContext(ThemeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      })
    ]).start();
  }, [weather]);
  
  if (!weather) {
    return null;
  }
  
  // Map OpenWeatherMap icon codes to MaterialCommunityIcons
  const getWeatherIconName = (iconCode) => {
    const iconMap = {
      '01d': 'weather-sunny',
      '01n': 'weather-night',
      '02d': 'weather-partly-cloudy',
      '02n': 'weather-night-partly-cloudy',
      '03d': 'weather-cloudy',
      '03n': 'weather-cloudy',
      '04d': 'weather-cloudy',
      '04n': 'weather-cloudy',
      '09d': 'weather-pouring',
      '09n': 'weather-pouring',
      '10d': 'weather-rainy',
      '10n': 'weather-rainy',
      '11d': 'weather-lightning-rainy',
      '11n': 'weather-lightning-rainy',
      '13d': 'weather-snowy',
      '13n': 'weather-snowy',
      '50d': 'weather-fog',
      '50n': 'weather-fog',
    };
    
    return iconMap[iconCode] || 'weather-cloudy';
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Animated.View 
        style={[
          styles.card, 
          { 
            backgroundColor: theme.card,
            opacity: fadeAnim,
            transform: [{ translateY }]
          }
        ]}
      >
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: theme.text }]}>
                {weather.city}, {weather.country}
              </Text>
              <Text style={[styles.subtitle, { color: theme.text }]}>
                {weather.date} • {weather.time}
              </Text>
            </View>
            <TouchableOpacity onPress={onPress}>
              <View style={styles.moreButton}>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.text} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.weatherInfo}>
            <View style={styles.temperatureContainer}>
              <Text style={[styles.temperature, { color: theme.text }]}>
                {weather.temperature}°C
              </Text>
              <Text style={[styles.feelsLike, { color: theme.text }]}>
                Feels like {weather.feelsLike}°C
              </Text>
            </View>
            
            <View style={styles.iconContainer}>
              <AnimatedWeatherIcon 
                name={getWeatherIconName(weather.icon)} 
                size={80} 
                color={theme.primary} 
              />
              <Text style={[styles.description, { color: theme.text }]}>
                {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="water-percent" size={22} color={theme.secondary} />
              <Text style={[styles.detailText, { color: theme.text }]}>
                {weather.humidity}%
              </Text>
              <Text style={[styles.detailLabel, { color: theme.text }]}>
                Humidity
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="weather-windy" size={22} color={theme.secondary} />
              <Text style={[styles.detailText, { color: theme.text }]}>
                {weather.windSpeed} m/s
              </Text>
              <Text style={[styles.detailLabel, { color: theme.text }]}>
                Wind
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="gauge" size={22} color={theme.secondary} />
              <Text style={[styles.detailText, { color: theme.text }]}>
                {weather.pressure} hPa
              </Text>
              <Text style={[styles.detailLabel, { color: theme.text }]}>
                Pressure
              </Text>
            </View>
          </View>
          
          <View style={styles.sunTimesContainer}>
            <View style={styles.sunTimeItem}>
              <MaterialCommunityIcons name="weather-sunset-up" size={22} color={theme.secondary} />
              <Text style={[styles.sunTimeText, { color: theme.text }]}>
                {weather.sunrise}
              </Text>
              <Text style={[styles.sunTimeLabel, { color: theme.text }]}>
                Sunrise
              </Text>
            </View>
            
            <View style={styles.sunTimeItem}>
              <MaterialCommunityIcons name="weather-sunset-down" size={22} color={theme.secondary} />
              <Text style={[styles.sunTimeText, { color: theme.text }]}>
                {weather.sunset}
              </Text>
              <Text style={[styles.sunTimeLabel, { color: theme.text }]}>
                Sunset
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 52,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
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
  sunTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  sunTimeItem: {
    alignItems: 'center',
  },
  sunTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sunTimeLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default WeatherCard;
