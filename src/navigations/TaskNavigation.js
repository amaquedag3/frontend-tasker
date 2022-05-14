import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskScreen from '../screens/HomeArea/TaskScreen';
import TaskForm from '../screens/HomeArea/TaskForm';
import EndedTasksScreen from '../screens/HomeArea/EndedTasksScreen';

const Stack = createNativeStackNavigator();

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