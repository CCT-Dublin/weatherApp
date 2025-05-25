import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import ForecastCard from '../components/ForecastCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { getForecastByCoords, getForecastByCity } from '../services/weatherService';

const ForecastScreen = ({ route, navigation}) => {
    const { theme } = useContext(ThemeContext);
    const { city, coordinates } = route.params || {};

    const [forecast, setForeCast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchForecastData();

        //this updates navigation tittle
        if(city) {
            navigation.setOptions({ title: '${city} Forecast'});
        }
    }, [city, coordinates]);

    const fetchForecastData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let forecastData;
      
      if (coordinates) {
        forecastData = await getForecastByCoords(coordinates.lat, coordinates.lon);
      } else if (city) {
        forecastData = await getForecastByCity(city);
      } else {
        throw new Error('No location provided');
      }
      
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setError('Unable to fetch forecast data. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

   const handleRefresh = () => {
    setRefreshing(true);
    fetchForecastData();
  };

  if (loading && !refreshing) {
    return <LoadingIndicator message="Fetching forecast data..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchForecastData} />;
  }

  if (!forecast) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.noDataText, { color: theme.text }]}>No forecast data available</Text>
      </View>
    );
  }


////stopped
  return (
    <View style={styles.container}>
      <Text>ForecastScreen - Current Weather will be displayed here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForecastScreen;
