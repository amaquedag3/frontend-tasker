import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/IdentificationArea/LoginScreen';
import RegisterScreen from '../screens/IdentificationArea/RegisterScreen';
import HomeDrawerNavigation from './HomeDrawerNavigation';

const Stack = createNativeStackNavigator();

export default function IdentificationNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} 
                options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} 
                options={{ headerShown: false  }}/>
            <Stack.Screen name="Home" component={HomeDrawerNavigation} 
                options={{ headerShown: false  }}/>
        </Stack.Navigator>
    )
}