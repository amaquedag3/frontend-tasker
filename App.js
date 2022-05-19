import  React, { useEffect, useState }  from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IdentificationNavigation from './src/navigations/IdentificationNavigation';
import useFonts from './src/hooks/useFonts';
import { AuthProvider } from './src/context/AuthContext';
import useAuth from './src/hooks/useAuth';
import { openDataBase, initDataBase } from './src/utils/sqliteDb';

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState()
  const { login, userData } = useAuth();

  useEffect(async()=>{
    initDataBase()
  }, [])


  const onStart = async() => {
    loadFonts()
  }

  const loadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={onStart()}
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