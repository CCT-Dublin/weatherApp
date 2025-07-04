﻿# Kaua Barbosa
# 2023257 - student number


# weatherApp
A beautiful and intuitive weather application built with React Native and Expo Go. This app provides real-time weather information, forecasts, and location-based weather data with a visually appealing interface that adapts to current weather conditions.

# Features
Current Weather Display: View current temperature, weather conditions, humidity, wind speed, and more

Location-Based Weather: Automatically fetches weather for your current location


Search Functionality: Search for weather in any city worldwide

5-Day Forecast: View detailed weather forecasts for the next 5 days

Dynamic Backgrounds: Beautiful gradient backgrounds that change based on weather conditions and time of day
Theme Support: Toggle between light and dark themes with smooth transitions

Favorites: Save your favorite locations for quick access
Search History: Easily access your recently searched locations

Responsive Design: Works on both iOS and Android devices
Technologies Used
React Native
Expo Go
OpenWeatherMap API
React Navigation
React Native Paper
Expo Linear Gradient
AsyncStorage
Installation
Clone the repository:
git clone 
cd weather-app
Install dependencies:
npm install
Install Expo CLI globally (if not already installed ):
npm install -g expo-cli
Create a .env file in the root directory and add your OpenWeatherMap API key:
OPENWEATHER_API_KEY=your_api_key_here
Start the development server:
expo start
Open the app on your device using Expo Go:
Scan the QR code with the Expo Go app (Android) or the Camera app (iOS)
Or run on an emulator/simulator

# Used
Home Screen

The home screen displays the current weather for your location. Pull down to refresh the data. Tap on the weather card to view the 5-day forecast.

Search Screen
Use the search bar to find weather information for any city. Recent searches and favorite locations are displayed below the search bar.

Forecast Screen
View detailed weather forecasts for the next 5 days, including temperature, humidity, wind speed, and more.
Settings Screen
Toggle between light and dark themes, and manage app preferences.

Customization
Changing Theme Colors
You can customize the theme colors by modifying the lightTheme and darkTheme objects in src/context/ThemeContext.js.

Customizing Weather Backgrounds
The weather-based gradient backgrounds can be customized in src/components/WeatherBackground.js by modifying the gradient colors for different weather conditions.

Troubleshooting
Location Permission Issues
If the app cannot access your location:
Check that location permissions are enabled for the app
Ensure location services are enabled on your device
Try restarting the app
API Connection Issues
If weather data isn't loading:
Verify your internet connection
Check that your API key is correctly set in the .env file
Ensure you haven't exceeded the API rate limits

Credits
Weather data provided by OpenWeatherMap
Icons by Material Community Icons
UI components from React Native Paper
License
This project is licensed under the MIT License - see the LICENSE file for details.
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
