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
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Store previous theme for animation purposes
    const prevThemeRef = useRef(theme);

    useEffect(() => {
        loadThemePreference();
    }, []);

    useEffect(() => {
        if (themeMode === 'system') {
            const newTheme = deviceTheme === 'dark' ? darkTheme : lightTheme;
            changeTheme(newTheme);
        }
    }, [deviceTheme, themeMode]);

    const loadThemePreference = async () => {
        try {
            const savedThemeMode = await AsyncStorage.getItem('themeMode');
            if (savedThemeMode) {
                setThemeMode(savedThemeMode);
                if (savedThemeMode === 'light') {
                    changeTheme(lightTheme);
                } else if (savedThemeMode === 'dark') {
                    changeTheme(darkTheme);
                } else {
                    const systemTheme = deviceTheme === 'dark' ? darkTheme : lightTheme;
                    changeTheme(systemTheme);
                }
            }
        } catch (error) {
            console.log('Error loading theme preference:', error);
        }
    };

    const changeTheme = (newTheme) => {
        prevThemeRef.current = theme;
        setTheme(newTheme);
        setIsAnimating(true);
        
        // Reset animation flag after animation duration
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    const toggleTheme = async () => {
        let newThemeMode;
        let newTheme;

        if (themeMode === 'system') {
            newThemeMode = theme.mode === 'light' ? 'dark' : 'light';
        } else {
            newThemeMode = themeMode === 'light' ? 'dark' : 'system';
        }
        
        setThemeMode(newThemeMode);

        if (newThemeMode === 'light') {
            newTheme = lightTheme;
        } else if (newThemeMode === 'dark'){
            newTheme = darkTheme;
        } else {
            newTheme = deviceTheme === 'dark' ? darkTheme : lightTheme;
        }

        changeTheme(newTheme);

        try {
            await AsyncStorage.setItem('themeMode', newThemeMode);
        } catch (error) {
            console.log('Error saving theme preference:', error);
        }
    };
    
    return (
        <ThemeContext.Provider 
            value={{ 
                theme,                // Current theme object with static values
                prevTheme: prevThemeRef.current, // Previous theme for animation reference
                isAnimating,          // Flag to indicate theme is changing
                toggleTheme,          // Function to toggle theme
                themeMode             // Current theme mode (light/dark/system)
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
