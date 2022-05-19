import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import WorkerScreen from '../screens/WorkerArea/WorkerScreen';

const Stack = createStackNavigator();

export default function WorkerNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WorkerHome"
                component={WorkerScreen}
                options={{ title: "", headerTransparent: true }}
            />
        </Stack.Navigator>
    )
}