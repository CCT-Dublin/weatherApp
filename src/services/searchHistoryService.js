import AsyncStorage from '@react-native-async-storage/async-storage';

// Add search to history
export const addToSearchHistory = async (searchTerm) => {
  try {
    const history = await getSearchHistory();
    
    // Remove if already exists (to move it to the top)
    const filteredHistory = history.filter(item => item !== searchTerm);
    
    // Add to the beginning of the array
    filteredHistory.unshift(searchTerm);
    
    // Keep only the last 10 searches
    const limitedHistory = filteredHistory.slice(0, 10);
    
    await AsyncStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    
    return limitedHistory;
  } catch (error) {
    console.error('Error adding to search history:', error);
    throw error;
  }
};

// Get search history
export const getSearchHistory = async () => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

// Clear search history
export const clearSearchHistory = async () => {
  try {
    await AsyncStorage.setItem('searchHistory', JSON.stringify([]));
    return [];
  } catch (error) {
    console.error('Error clearing search history:', error);
    throw error;
  }
};
