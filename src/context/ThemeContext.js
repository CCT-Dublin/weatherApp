import React, { createContext, useState, useEffect } from 'react';
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

        useEffect(() => {
          loadThemePreference();
         }, []);

    useEffect(() => {
        if (themeMode === 'system') {
            setTheme(deviceTheme === 'dark' ? darkTheme : lightTheme);
        }
    }, [deviceTheme, themeMode]);

    const loadThemePreference = async () => {
        try {
            const savedThemeMode = await AsyncStorage.getItem('themeMode');
                if (savedThemeMode) {
                    setThemeMode(savedThemeMode);
                    if (savedThemeMode === 'light') {
                        setTheme(lightTheme);
                    } else if (savedThemeMode === 'dark') {
                        setTheme(darkTheme);
                    }
                }
            }catch (error) {
                console.log('Error loading theme preference:', error);
            }
        };

        const toggleTheme = async () => {
            const newThemeMode = themeMode === 'system'
            ? (theme.mode === 'light' ? 'dark' : 'light')
            : (themeMode === 'light' ? 'dark' : 'light'); 

              
             setThemeMode(newThemeMode);

            if (newThemeMode === 'light') {
                 setTheme(lightTheme);
             } else if (newThemeMode === 'dark'){
                setTheme(darkTheme);
            } else {
                 setTheme(deviceTheme === 'dark' ? darkTheme : lightTheme);
           }

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