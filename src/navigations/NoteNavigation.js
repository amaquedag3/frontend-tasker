import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from '../screens/HomeArea/NotesScreen';
import NoteForm from '../components/Notes/NoteForm';


const Stack = createStackNavigator();

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