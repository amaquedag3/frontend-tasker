import  React, { useEffect, useState }  from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import IdentificationNavigation from './src/navigations/IdentificationNavigation';
import useFonts from './src/hooks/useFonts';
import { AuthProvider } from './src/context/AuthContext';

//Funcion principal de la aplicación
export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  
  const onStart = async() => {
    loadFonts()
  }
  //Función que llama al hook que carga la fuente usada en la aplicación
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

  //Proveedor de navegación a la aplicación
  //Hook que provee de los datos del usuario a los componentes de la aplicación
  //Navegación Inicial de la aplicación
  return (
    <NavigationContainer>
      <AuthProvider>
        <IdentificationNavigation/>
      </AuthProvider>
    </NavigationContainer>  
  );
}