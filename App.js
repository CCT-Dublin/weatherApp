import React, { useContext } from'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, ThemeContext} from './src/context/ThemeContext';

function AppContent() {
  const { theme } =
  useContext (ThemeContext);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        <AppNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function App() {
  return(
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
 
