import React, { useContext, useRef } from 'react';
import { Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import WeatherCard from './WeatherCard';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

const SwipeableWeatherCard = ({ weather, onSwipeLeft, onSwipeRight }) => {
  const { theme } = useContext(ThemeContext);
  const pan = useRef(new Animated.ValueXY()).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swiped right
          Animated.spring(pan, {
            toValue: { x: width, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            if (onSwipeRight) onSwipeRight();
          });
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          // Swiped left
          Animated.spring(pan, {
            toValue: { x: -width, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            if (onSwipeLeft) onSwipeLeft();
          });
        } else {
          // Return to center
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  
  const cardOpacity = pan.x.interpolate({
    inputRange: [-width/2, 0, width/2],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });
  
  const cardScale = pan.x.interpolate({
    inputRange: [-width/2, 0, width/2],
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: pan.x },
            { scale: cardScale }
          ],
          opacity: cardOpacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <WeatherCard weather={weather} onPress={() => {}} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SwipeableWeatherCard;
