import React from'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, ThemeContext} from './src/context/ThemeContext';

export default function App() {
 return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <PaperProvider>
            <SafeAreaProvider>
              <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
              <AppNavigator />
            </SafeAreaProvider>
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
