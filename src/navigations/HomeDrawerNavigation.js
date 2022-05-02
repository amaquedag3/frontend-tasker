import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeTabNavigation from './HomeTabNavigation'
import ProjectNavigation from './ProjectNavigation';
import StudentScreen from '../screens/StudentScreen';
import WorkerScreen from '../screens/WorkerScreen';
import SettingScreen from '../screens/SettingsScreen';


const Drawer = createDrawerNavigator();

export default function HomeDrawerNavigation() {
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                //not working
                headerShown: false,
                drawerActiveBackgroundColor: '#aa18ea',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontFamily: 'Roboto_Medium',
                    fontSize: 15,
                },
            }}>
            <Drawer.Screen
                name="HomeTab" 
                component={HomeTabNavigation} 
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({color}) => (
                        <Ionicons name="home-outline" size={35} color={'purple'} />
                    )
            }}/>
            <Drawer.Screen name="Proyectos" component={ProjectNavigation}
                options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="construct-outline" size={35} color={'purple'} />
                )
            }}/>
            <Drawer.Screen name="Estudiante" component={StudentScreen}
                options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="book-outline" size={35} color={'purple'} />
                )
            }}/>
            <Drawer.Screen name="Trabajador" component={WorkerScreen}
                options={{
                drawerIcon: ({color}) => (
                    <MaterialIcons name="work-outline" size={35} color={'purple'} />
                )
            }}/>
            <Drawer.Screen name="Ajustes" component={SettingScreen}
                options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="settings-outline" size={35} color={'purple'} />
                )
            }}/>
        </Drawer.Navigator>
    )
}
