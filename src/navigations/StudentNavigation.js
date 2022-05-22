import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import StudentScreen from '../screens/StudentArea/StudentScreen';
import SubjectFormScreen from '../screens/StudentArea/SubjectFormScreen';
import SubjectDetailsScreen from '../screens/StudentArea/SubjectDetailsScreen';
import ExamFormScreen from '../screens/StudentArea/ExamFormScreen';


const Stack = createStackNavigator();
//Navigation que permite la navegación entre :
    //Pantalla principal de Estudiante --> Listado de asignaturas
    //Pantalla de formulario de Asignaturas
    //Pantalla de muestra los detalles de una asignturas --> Listado de examenes
    //Pantalla de formualrio de Exámentes
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