import React, { useContext } from'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Animated } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, ThemeContext} from './src/context/ThemeContext';

export default function App() {
 return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, animatedTheme }) => (
          <PaperProvider>
            <SafeAreaProvider>
              <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
              <Animated.View style={{ flex: 1, background: animatedTheme.background }}>
              <AppNavigator />
              </Animated.View>
            </SafeAreaProvider>
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
