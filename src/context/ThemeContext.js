import React, { createContext, useState, useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const lightTheme = {
    mode: 'light',
    background: '#f8f9fa',
    text: '#212529',
    card: '#ffffff',
    border: '#dee2e6',
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
};

const darkTheme = {
    mode: 'dark',
    background: '#212529',
    text: '#f8f9fa',
    card: '#343a40',
    border: '#495057',
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
};

export const ThemeProvider = ({ children }) => {
    const deviceTheme = useColorScheme();
    const [theme, setTheme] = useState(deviceTheme === 'dark' ? darkTheme : lightTheme);
    const [themeMode, setThemeMode] = useState('system');

    //animation value added for some smooth transitions through the system
const animatedValue = useRef(new Animated.Value(deviceTheme === 'dark' ? 1 : 0)).current;

      // Animated theme values
  const animatedTheme = {
    mode: theme.mode,
    background: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.background, darkTheme.background],
    }),
    text: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.text, darkTheme.text],
    }),
    card: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.card, darkTheme.card],
    }),
    border: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.border, darkTheme.border],
    }),
    primary: theme.primary,
    secondary: theme.secondary,
    success: theme.success,
    danger: theme.danger,
    warning: theme.warning,
    info: theme.info,
  };

    useEffect(() => {
          loadThemePreference();
    }, []);

    useEffect(() => {
        if (themeMode === 'system') {
            const newTheme = deviceTheme === 'dark' ? darkTheme : lightTheme;
            animatedThemeChange(newTheme);
        }
    }, [deviceTheme, themeMode]);

    const loadThemePreference = async () => {
        try {
            const savedThemeMode = await AsyncStorage.getItem('themeMode');
                if (savedThemeMode) {
                    setThemeMode(savedThemeMode);
                    if (savedThemeMode === 'light') {
                        animatedThemeChange(lightTheme);
                    } else if (savedThemeMode === 'dark') {
                        animatedThemeChange(darkTheme);
                    } else {
                        const systemTheme = deviceTheme === 'dark' ? darkTheme : lightTheme;
                        animatThemeChange(systemTheme);
                    }
                }
            }catch (error) {
                console.log('Error loading theme preference:', error);
            }
        };

    const animateThemeChange = (newTheme) => {
    setTheme(newTheme);
    
    Animated.timing(animatedValue, {
      toValue: newTheme.mode === 'dark' ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

        const toggleTheme = async () => {
            let newThemeMode;
            let newTheme;

           if (themeMode === 'system') {
      newThemeMode = theme.mode === 'light' ? 'dark' : 'light';
    } else {
      newThemeMode = themeMode === 'light' ? 'dark' : 'system';
    }
              ////
             setThemeMode(newThemeMode);

            if (newThemeMode === 'light') {
                 newTheme = lightTheme;
             } else if (newThemeMode === 'dark'){
                newTheme = darkTheme;
            } else {
                 newTheme = deviceTheme === 'dark' ? darkTheme : lightTheme;
           }

           animatedThemeChange(newTheme);

           try{
             await AsyncStorage.setItem('themeMode', newThemeMode);
              } catch (error) {
                    console.log('Error saving theme preference:',error);
            }
        };
       
             return (
                 <ThemeContext.Provider value={{ theme, toggleTheme, themeMode }}>
                    {children}
                  </ThemeContext.Provider>
                 );


};