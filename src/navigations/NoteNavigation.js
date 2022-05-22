import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from '../screens/HomeArea/NotesScreen';
import NoteForm from '../screens/HomeArea/NoteForm';


const Stack = createStackNavigator();

//Navegación de Notas que permite la navegación entre:
    //La Pantalla de listado de recordatorios
    //La Pantalla de fomulario de recordatorios
export default function NoteNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="NoteList"
                component={NotesScreen}
                options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
                name="NoteForm"
                component={NoteForm}
                options={{ title: "", headerTransparent: true }}
            />
        </Stack.Navigator>
    )
}