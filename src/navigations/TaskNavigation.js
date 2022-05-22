import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskScreen from '../screens/HomeArea/TaskScreen';
import TaskForm from '../screens/HomeArea/TaskForm';
import EndedTasksScreen from '../screens/HomeArea/EndedTasksScreen';

const Stack = createNativeStackNavigator();
//Navegación de las tareas, que permite la navegación entre las pantallas de:
    //Pantalla principal de las tareas
    //Pantalla de Formulario de tareas
    //Pantalla de Tareas terminadas
export default function TaskNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={TaskScreen} 
                options={{ headerShown: false }}/>
            <Stack.Screen name="Form" component={TaskForm} 
                options={{ headerShown: false  }}/>
            <Stack.Screen name="EndedTasks" component={EndedTasksScreen}
                options={{ headerShown: false  }}/>
        </Stack.Navigator>
    )
}