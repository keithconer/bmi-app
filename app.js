import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import ThemeProvider from './app/context/ThemeContext';  // Correct path to ThemeContext
import HomeScreen from './app/components/HomeScreen';   // Correct path to HomeScreen

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider theme={ThemeProvider.theme}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}
