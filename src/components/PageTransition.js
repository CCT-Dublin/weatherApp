import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PageTransition = ({ children, visible, style }) => {
  const translateX = useRef(new Animated.Value(visible ? 0 : width)).current;
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible]);
  
  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateX }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default PageTransition;
