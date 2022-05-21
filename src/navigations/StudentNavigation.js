import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import StudentScreen from '../screens/StudentArea/StudentScreen';
import SubjectFormScreen from '../screens/StudentArea/SubjectFormScreen';
import SubjectDetailsScreen from '../screens/StudentArea/SubjectDetailsScreen';
import ExamFormScreen from '../screens/StudentArea/ExamFormScreen';


const Stack = createStackNavigator();

export default function StudentNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="StudentHome"
                component={StudentScreen}
                options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
                name="SubjectForm"
                component={SubjectFormScreen}
                options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
                name="SubjectDetails"
                component={SubjectDetailsScreen}
                options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
                name="ExamForm"
                component={ExamFormScreen}
                options={{ title: "", headerTransparent: true }}
            />
        </Stack.Navigator>
    )
}