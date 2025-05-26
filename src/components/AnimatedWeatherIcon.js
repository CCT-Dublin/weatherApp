import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedWeatherIcon = ({ name, size, color, style }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Different animations based on weather icon type
    if (name.includes('wind') || name.includes('cloudy')) {
      // Rotation animation for wind or cloudy icons
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else if (name.includes('rain') || name.includes('snow')) {
      // Pulsing animation for rain or snow icons
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else if (name.includes('sun') || name.includes('moon')) {
      // Gentle pulsing for sun or moon icons
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 2000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 2000,
            easing: Easing.ease,
            useNativeDriver: true,
          })
        ])
      ).start();
    }
  }, [name]);
  
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [
            { rotate: spin },
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedWeatherIcon;
