import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Keyboard } from 'react-native';
import { Searchbar, List, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { getCurrentWeatherByCity } from '../services/weatherService';
import { addToSearchHistory, getSearchHistory, clearSearchHistory } from '../services/searchHistoryService';
import { getFavoriteLocations, saveLocationToFavorites, removeLocationFromFavorites } from '../services/locationService';

const SearchScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const history = await getSearchHistory();
      setSearchHistory(history);
      
      const favLocations = await getFavoriteLocations();
      setFavorites(favLocations);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      Keyboard.dismiss();
      
      const weatherData = await getCurrentWeatherByCity(searchQuery.trim());
      setSearchResults(weatherData);
      
      // Add to search history
      const updatedHistory = await addToSearchHistory(searchQuery.trim());
      setSearchHistory(updatedHistory);
      
      // Clear search query
      setSearchQuery('');
    } catch (error) {
      console.error('Error searching for location:', error);
      setError(`No results found for "${searchQuery}". Please check the spelling and try again.`);
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryItemPress = async (item) => {
    setSearchQuery(item);
    try {
      setLoading(true);
      setError(null);
      
      const weatherData = await getCurrentWeatherByCity(item);
      setSearchResults(weatherData);
      
      // Update search history order
      const updatedHistory = await addToSearchHistory(item);
      setSearchHistory(updatedHistory);
      
      // Clear search query
      setSearchQuery('');
    } catch (error) {
      console.error('Error fetching history item:', error);
      setError(`Failed to get weather for "${item}". The location might no longer be available.`);
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearSearchHistory();
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!searchResults) return;
    
    try {
      const isFavorite = favorites.some(fav => 
        fav.city === searchResults.city && fav.country === searchResults.country
      );
      
      let updatedFavorites;
      
      if (isFavorite) {
        updatedFavorites = await removeLocationFromFavorites(searchResults);
      } else {
        updatedFavorites = await saveLocationToFavorites({
          city: searchResults.city,
          country: searchResults.country,
          coordinates: searchResults.coordinates,
        });
      }
      
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const navigateToForecast = () => {
    if (searchResults) {
      navigation.navigate('Forecast', { 
        city: searchResults.city,
        coordinates: searchResults.coordinates
      });
    }
  };

  const isFavorite = searchResults && favorites.some(fav => 
    fav.city === searchResults.city && fav.country === searchResults.country
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Searchbar
        placeholder="Search for a city..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={[styles.searchBar, { backgroundColor: '#3a3a3a' }]}
        iconColor={theme.text}
        inputStyle={{ color: '#ffffff' }}
        placeholderTextColor={theme.secondary}
        theme={{ colors: { primary: theme.primary } }}
      />
      
      {loading ? (
        <LoadingIndicator message="Searching..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : searchResults ? (
        <View style={styles.resultsContainer}>
          <List.Item
            title={`${searchResults.city}, ${searchResults.country}`}
            description={`${searchResults.temperature}°C, ${searchResults.description}`}
            left={props => (
              <List.Icon 
                {...props} 
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="map-marker" size={size} color={theme.primary} />
                )} 
              />
            )}
            right={props => (
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={handleToggleFavorite} style={styles.actionButton}>
                  <MaterialCommunityIcons 
                    name={isFavorite ? "heart" : "heart-outline"} 
                    size={24} 
                    color={isFavorite ? theme.danger : theme.text} 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToForecast} style={styles.actionButton}>
                  <MaterialCommunityIcons name="calendar" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
            )}
            titleStyle={{ color: theme.text }}
            descriptionStyle={{ color: theme.text }}
            onPress={navigateToForecast}
          />
        </View>
      ) : (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={[styles.historyTitle, { color: theme.text }]}>Recent Searches</Text>
            {searchHistory.length > 0 && (
              <TouchableOpacity onPress={handleClearHistory}>
                <Text style={[styles.clearButton, { color: theme.primary }]}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {searchHistory.length === 0 ? (
            <Text style={[styles.emptyMessage, { color: theme.secondary }]}>
              Your search history will appear here
            </Text>
          ) : (
            <FlatList
              data={searchHistory}
              keyExtractor={(item, index) => `history-${index}`}
              renderItem={({ item }) => (
                <List.Item
                  title={item}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon={({ size, color }) => (
                        <MaterialCommunityIcons name="history" size={size} color={theme.secondary} />
                      )} 
                    />
                  )}
                  titleStyle={{ color: theme.text }}
                  onPress={() => handleHistoryItemPress(item)}
                />
              )}
              ItemSeparatorComponent={() => <Divider style={{ backgroundColor: theme.border }} />}
            />
          )}
          
          <View style={styles.historyHeader}>
            <Text style={[styles.historyTitle, { color: theme.text }]}>Favorites</Text>
          </View>
          
          {favorites.length === 0 ? (
            <Text style={[styles.emptyMessage, { color: theme.secondary }]}>
              Your favorite locations will appear here
            </Text>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item, index) => `favorite-${index}`}
              renderItem={({ item }) => (
                <List.Item
                  title={`${item.city}, ${item.country}`}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon={({ size, color }) => (
                        <MaterialCommunityIcons name="heart" size={size} color={theme.danger} />
                      )} 
                    />
                  )}
                  titleStyle={{ color: theme.text }}
                  onPress={() => handleHistoryItemPress(`${item.city}`)}
                />
              )}
              ItemSeparatorComponent={() => <Divider style={{ backgroundColor: theme.border }} />}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    fontSize: 14,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
  },
});

export default SearchScreen;
