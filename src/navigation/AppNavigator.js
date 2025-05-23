import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ForecastScreen from '../screens/ForecastScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ tittle: 'Weather App'}}
                />

                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ title: 'Search Location' }}
                />

                 <Stack.Screen 
                     name="Forecast" 
                     component={ForecastScreen} 
                     options={{ title: '5-Day Forecast' }} 
                 />
                
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ title: 'Settings' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
