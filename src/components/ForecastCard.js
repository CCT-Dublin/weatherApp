import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const ForecastCard = ({ forecast, date }) => {
    const { theme } = useContext(ThemeContext);

    if (!forecast || !forecast.length){
        return null;
    }

    //this variable gets first forecast item for the day to display the date
    const firstItem = forecast[0];

    //this calculates min and max temperature for the day 
    const minTemp = Math.min(...forecast.map(item => item.temperature));
    const maxTemp = Math.max(...forecast.map(item => item.temperature));

    return (
        <Card style={[styles.card, { backgroundColor: theme.card}]}>
            <Card.Content>
                <Text style={[styles.date, {color:theme.text }]}>{date}</Text>

            <View style={styles.summaryContainer}>
                <View style={styles.temperatureRange}>
                    <Text style={[styles.tempMax, { color: theme.text }]}>{maxTemp}°</Text>
                    <Text style={[styles.tempMin, { color: theme.secondary }]}>{minTemp}°</Text>
                </View>
                
                <View style={styles.weatherInfo}>
            <Image source={{ uri: firstItem.iconUrl }} style={styles.weatherIcon} />
            <Text style={[styles.description, { color: theme.text }]}>
              {firstItem.description.charAt(0).toUpperCase() + firstItem.description.slice(1)}
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyContainer}>
            {forecast.map((item, index) => (
                <View key={index} style={styles.hourlyItem}>
                    <Text style={[styles.hourlyTime, {color: theme.text }]}>{item.time}</Text>
                    <Image source={{ uri: item.iconUrl }} style={styles.hourlyIcon} />                
                    <Text style={[styles.hourlyTemp, { color: theme.text }]}>{item.temperature}°</Text>
                </View>
            ))}
        </ScrollView>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="water-percent" size={18} color={theme.text} />
            <Text style={[styles.detailText, { color: theme.text }]}>
              {Math.round(forecast.reduce((sum, item) => sum + item.humidity, 0) / forecast.length)}%
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="weather-windy" size={18} color={theme.text} />
            <Text style={[styles.detailText, { color: theme.text }]}>
              {Math.round(forecast.reduce((sum, item) => sum + item.windSpeed, 0) / forecast.length)} m/s
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="gauge" size={18} color={theme.text} />
            <Text style={[styles.detailText, { color: theme.text }]}>
              {Math.round(forecast.reduce((sum, item) => sum + item.pressure, 0) / forecast.length)} hPa
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 4,
    },

    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    summaryContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    temperatureRange: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    tempMax: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 8,
    },
    tempMin: {
        fontSize: 20,
    },
    weatherInfo: {
        alignItems: 'center',
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
    },
    hourlyContainer: {
        marginBottom: 16,
    },
    hourlyItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 60,
    },
    hourlyTime: {
        fontSize: 12,
        marginBottom: 4,
    },
    hourlyIcon: {
        width: 30,
        height: 30,
        marginBottom: 4,
    },
    hourlyTemp: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 14,
        marginLeft: 4,
    },
});

export default ForecastCard;
