import { View, Text, ImageBackground, Image, StyleSheet} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


export default function CustomDrawer(props) {
    const { logout, userData } = useAuth();
    const navigation = useNavigation();

    
    const handleLogout = async() => {
        navigation.navigate('Login')
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('password')
        logout()
    }
    
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <ImageBackground 
                    source={require('../../assets/back-drawer.jpg')} 
                    style={{padding:20}}>
                    <Image source={require('../../assets/gengar.png')} style={styles.icon}/>
                    <Text style={styles.title}>{userData.name}</Text>
                </ImageBackground>
                <View style={styles.itemListContainer}>
                    <DrawerItemList {...props}/>
                </View>
                
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <TouchableOpacity 
                    onPress={handleLogout}
                    style={{paddingVertical: 15}}>
                    <View style={styles.logoutContainer}>
                        <Ionicons name='exit-outline' size={30}/>
                        <Text style={styles.logoutText}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        icon: {
            height: 90,
            width: 90,
            borderRadius: 40,
            marginBottom: 10
        },
        title: {
            color: 'white',
            fontSize: 18,
            fontFamily: 'Roboto_Medium'
        },
        itemListContainer: {
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 10
        },
        footer: {
            padding: 10,
            borderTopWidth: 1,
            borderTopColor: '#ccc'
        },
        logoutContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15
        },
        logoutText: {
            fontSize: 15,
            fontFamily: 'Roboto_Medium',
            marginLeft: 5
        }
    }
)