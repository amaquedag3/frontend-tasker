import  React, { useState }  from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import IdentificationNavigation from './src/navigations/IdentificationNavigation';
import useFonts from './src/hooks/useFonts';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const loadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  

  return (
    <NavigationContainer>
      <AuthProvider>
        <IdentificationNavigation/>
      </AuthProvider>
    </NavigationContainer>  
  );
}