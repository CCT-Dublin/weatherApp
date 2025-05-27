import React, { useContext } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const CustomRefreshControl = ({ refreshing, onRefresh }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[theme.primary]}
      tintColor={theme.primary}
      progressBackgroundColor={theme.card}
      progressViewOffset={10}
      title="Updating weather data..."
      titleColor={theme.text}
    />
  );
};

export default CustomRefreshControl;
