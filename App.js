import  React, { useEffect, useState }  from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IdentificationNavigation from './src/navigations/IdentificationNavigation';
import useFonts from './src/hooks/useFonts';
import { AuthProvider } from './src/context/AuthContext';
import useAuth from './src/hooks/useAuth';
import { getUsers, initDatabase, insertUser } from './src/utils/sqliteDb';


export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState()
  const { login, userData } = useAuth();

  useEffect(async()=>{
    initDatabase()
    let user = {
      id: '123',
      email: 'prueba',
      password: 'prueba',
      firstname: 'prueba',
      lastname: 'prueba'
    }
    await insertUser(user)
    await getUsers()
  }, [])

  const checkStoredUserCredentials = async() => {
    try{
      const data = await AsyncStorage.getItem('token')
      console.log('Token recibido en App.js: ')
      if(data !== null){
        login(data)
      }else{
        await AsyncStorage.removeItem('token')
      }
    }catch(error){
      console.log(error)
    }
  }

  const onStart = async() => {
    loadFonts()
    checkStoredUserCredentials()
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