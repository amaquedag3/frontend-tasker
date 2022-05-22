import React from 'react'
import { Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TaskNavigation from '../navigations/TaskNavigation'
import CalendarScreen from '../screens/HomeArea/CalendarScreen';
import NoteNavigation from './NoteNavigation';


const Tab = createBottomTabNavigator();

//Navegación de la barra inferior que contiene las pantalla del calendario
// y las navegaciones de Tareas y Notas
export default function HomeTabNavigation() {
    return (
        <Tab.Navigator initialRouteName='Tasks'
            screenOptions={({}) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 50,
                    paddingHorizontal: 0,
                    paddingTop: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    position: 'absolute',
                    borderTopWidth: 0,
                },
            })}>
            <Tab.Screen
                name="Calendar" 
                component={CalendarScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: () => renderCalendar()
                }
            }
        />
        
        <Tab.Screen 
            name="Tasks" 
            component={TaskNavigation}
            options={{
                headerShown: false,
                tabBarLabel: "",
                tabBarIcon: () => renderTask()
            }}
        />

        <Tab.Screen 
            name="Notes" 
            component={NoteNavigation}
            options={{
                headerShown: false,
                tabBarLabel: "",
                tabBarIcon: () => renderNote()
            }}
        />  
        </Tab.Navigator>
    )
}

function renderNote() {
    var route = "../../assets/note.png"
    return (
        <Image
            source={require(route)}
            style={{ width: 28, height: 28 }}
        />
    );
}

function renderCalendar() {
    var route = "../../assets/calendar.png"
    return (
        <Image
            source={require(route)}
            style={{ width: 28, height: 28 }}
        />
    );
}

function renderTask() {
    var route = "../../assets/stopwatch.png"
    return (
        <Image
            source={require(route)}
            style={{ width: 40, height: 40 }}
        />
    );
}
