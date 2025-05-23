import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

//request location permissions
export const requestLocationPermission = async () => {
    try{
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status === 'granted';
    } catch (error){
        console.error('Error requesting location permission:', error);
        return false;
    }
};

//it gets current location
export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) {
      throw new Error('Location permission not granted');
    }
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    throw error;
  }
};

//save location to favorites
export const saveLocationToFavorites = async (location) => {
  try {
    const favorites = await getFavoriteLocations();
    
    // Check if location already exists in favorites
    const exists = favorites.some(fav => 
      fav.city === location.city && fav.country === location.country
    );
    
    if (!exists) {
      favorites.push(location);
      await AsyncStorage.setItem('favoriteLocations', JSON.stringify(favorites));
    }
    
    return favorites;
  } catch (error) {
    console.error('Error saving location to favorites:', error);
    throw error;
  }
};

// Get favorite locations
export const getFavoriteLocations = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favoriteLocations');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorite locations:', error);
    return [];
  }
};

// Remove location from favorites
export const removeLocationFromFavorites = async (location) => {
  try {
    const favorites = await getFavoriteLocations();
    
    const updatedFavorites = favorites.filter(fav => 
      !(fav.city === location.city && fav.country === location.country)
    );
    
    await AsyncStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
    
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing location from favorites:', error);
    throw error;
  }
};