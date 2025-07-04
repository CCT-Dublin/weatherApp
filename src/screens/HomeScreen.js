import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import WeatherCard from '../components/WeatherCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import LocationHeader from '../components/LocationHeader';
import LocationPermissionRequest from '../components/LocationPermissionRequest';
import { getCurrentWeatherByCoords } from '../services/weatherService';
import { getCurrentLocation, requestLocationPermission } from '../services/locationService';
import CustomRefreshControl from '../components/CustomRefreshControl';

const HomeScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      setHasLocationPermission(hasPermission);
      
      if (hasPermission) {
        fetchWeatherData();
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
      setHasLocationPermission(false);
    }
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get current location
      const location = await getCurrentLocation();
      console.log('Location received:', location);
      
      // Ensure location has latitude and longitude
      if (!location || !location.latitude || !location.longitude) {
        throw new Error('Invalid location data');
      }
      
      // Fetch weather data for current location
      const weatherData = await getCurrentWeatherByCoords(
        location.latitude,
        location.longitude
      );
      
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to fetch weather data. Please check your connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
  };

  const navigateToForecast = () => {
    if (weather) {
      navigation.navigate('Forecast', { 
        city: weather.city,
        coordinates: weather.coordinates
      });
    }
  };

  if (loading && !refreshing) {
    return (
      <LoadingIndicator message="Fetching weather data..." />
    );
  }

  if (!hasLocationPermission) {
    return (
      <LocationPermissionRequest onRequestPermission={checkLocationPermission} />
    );
  }

  if (error && !weather) {
    return (
      <ErrorMessage message={error} onRetry={fetchWeatherData} />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {weather && (
        <LocationHeader 
          city={weather.city} 
          country={weather.country} 
          onRefresh={fetchWeatherData} 
        />
      )}
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <CustomRefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {weather && (
          <WeatherCard 
            weather={weather} 
            onPress={navigateToForecast} 
          />
        )}
      </ScrollView>
      
      <View style={styles.fabContainer}>
        <FAB
          style={[styles.fab, { backgroundColor: theme.primary }]}
          icon="magnify"
          color="white"
          onPress={() => navigation.navigate('Search')}
        />
        <FAB
          style={[styles.fab, styles.settingsFab, { backgroundColor: theme.secondary }]}
          icon="cog"
          color="white"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  fab: {
    marginBottom: 16,
  },
  settingsFab: {
    marginBottom: 0,
  },
});

export default HomeScreen;
