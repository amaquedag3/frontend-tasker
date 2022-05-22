import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectScreen from "../screens/ProjectArea/ProjectScreen";
import ProjectDetailsScreen from "../screens/ProjectArea/ProjectDetailsScreen";
import ProjectForm from "../screens/ProjectArea/ProjectForm";
import PhaseForm from "../screens/ProjectArea/PhaseForm";

const Stack = createStackNavigator();

//Navigation que permite la navegación entre las pantallas de:
    //Pantalla de listado de proyectos
    //Pantalla de formulario de proyectos
    //Pantalla de formulario de proyetos
    //Pantalla de formulario de fases de proyectos
export default function ProjectNavigation() {
    return (
        <Stack.Navigator initialRouteName="ProjectsList">
            <Stack.Screen
                name="ProjectsList"
                component={ProjectScreen}
                options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
                name="ProjectDetails"
                component={ProjectDetailsScreen}
                options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
                name="ProjectForm"
                component={ProjectForm}
                options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
                name="PhaseForm"
                component={PhaseForm}
                options={{ title: "", headerTransparent: true }}
            />
        </Stack.Navigator>
    );
}
