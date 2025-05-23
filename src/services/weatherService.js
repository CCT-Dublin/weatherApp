import axios from 'axios';
import { API_KEY, BASE_URL, ICON_URL } from './config';

// Format temperature from Kelvin to Celsius
const formatTemperature = (temp) => {
  return Math.round(temp - 273.15);
};

// Format date from timestamp
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Format time from timestamp
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get weather icon URL
export const getIconUrl = (iconCode) => {
  return `${ICON_URL}/${iconCode}@2x.png`;
};

// Get current weather by city name
export const getCurrentWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
      },
    });
    
    return formatWeatherData(response.data);
  } catch (error) {
    console.error('Error fetching current weather by city:', error);
    throw error;
  }
};

// Get current weather by coordinates
export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    console.log(`Fetching weather for: lat=${lat}, lon=${lon}`);
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    
    return formatWeatherData(response.data);
  } catch (error) {
    console.error('Error fetching current weather by coordinates:', error);
    throw error;
  }
};

// Get 5-day forecast by city name
export const getForecastByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
      },
    });
    
    return formatForecastData(response.data);
  } catch (error) {
    console.error('Error fetching forecast by city:', error);
    throw error;
  }
};

// Get 5-day forecast by coordinates
export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    
    return formatForecastData(response.data);
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};

// Format weather data
const formatWeatherData = (data) => {
  return {
    id: data.id,
    city: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    iconUrl: getIconUrl(data.weather[0].icon),
    temperature: formatTemperature(data.main.temp),
    feelsLike: formatTemperature(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    sunrise: formatTime(data.sys.sunrise),
    sunset: formatTime(data.sys.sunset),
    date: formatDate(data.dt), // Using dt from API, not timestamp
    time: formatTime(data.dt), // Using dt from API, not timestamp
    coordinates: {
      lat: data.coord.lat,
      lon: data.coord.lon,
    },
  };
};

// Format forecast data
const formatForecastData = (data) => {
  const forecastList = data.list.map(item => ({
    dt: item.dt,
    date: formatDate(item.dt),
    time: formatTime(item.dt),
    temperature: formatTemperature(item.main.temp),
    feelsLike: formatTemperature(item.main.feels_like),
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    iconUrl: getIconUrl(item.weather[0].icon),
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
    pressure: item.main.pressure,
  }));

  // Group forecast by day
  const groupedForecast = {};
  forecastList.forEach(item => {
    const date = item.date.split(',')[0]; // Get only the day part
    if (!groupedForecast[date]) {
      groupedForecast[date] = [];
    }
    groupedForecast[date].push(item);
  });

  return {
    city: data.city.name,
    country: data.city.country,
    coordinates: {
      lat: data.city.coord.lat,
      lon: data.city.coord.lon,
    },
    list: forecastList,
    groupedByDay: groupedForecast,
  };
};
