import React, { useState, useEffect } from "react";
import {StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../hooks/useAuth";
import { APIlogin } from "../../../api";

export default function LoginScreen() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { login, userData } = useAuth();
    const navigation = useNavigation();

    //Metodo que es llamado al hacer press en submit
    function handleSubmit(){
        if(validateInput()){
            loginAPIResponse()
        }
    }

    //Validación de entrada de campos
    function validateInput(){
        setError('');
        if(email == '' || password == ''){
            setError('Introduce ambos campos');
            return false;
        }
        return true;
    }

    //Metodo que maneja la respuesta de la API
    const loginAPIResponse = async() => {
        const result = await APIlogin({email, password})
        if(result.status != 200){
            setError(result.message)
        }else{
            login({
                'token': result.token,
                'id': result.user.id,
                'email': result.user.email,
                'password': password,
                'name': result.user.firstname
            })
            await storeUserCreddentials()
            navigation.navigate('Home')
        }
    }

    //Metodo que guarda en LocalStorage las credenciales para el siguiente login
    const storeUserCreddentials = async() => {
        try {
            AsyncStorage.setItem('credentials',  JSON.stringify({email, password}))
        } catch (error) {
            console.log(error)
        }
    }

    //Metodo que se activa cuando se inicia el componente
    //Busca los datos del ultimo usuario logeado
    useEffect(async() => {
        try{
            const data = JSON.parse(await AsyncStorage.getItem('credentials'))
            if(data){
                setEmail(data.email)
                setPassword(data.password)
            }
        }catch(error){
            console.log(error)
        }
    }, [])

    return (
        <ImageBackground source={require('../../../assets/night-landscape.jpg')} style={styles.background}>
            <Text style={styles.mainTitle}>Welcome to Tasker</Text>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        placeholder="Contraseña"
                        style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />

                    <Text style={styles.error}>{error}</Text>

                    <View style={styles.btn}>
                        <TouchableWithoutFeedback onPress={handleSubmit}>
                            <Text style={styles.loginText}> Entrar </Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <SafeAreaView>
                        <TouchableWithoutFeedback onPress={() => {navigation.navigate("Register")}}>
                            <Text style={styles.registerText}>Resgistrate aquí</Text>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        height: '100%',
    },
    background:{
        width: '100%',
        height: '100%'
    },
    mainTitle: {
        marginTop: 100,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 28
    },
    form: {
        marginTop: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 30,
        elevation: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 15,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F2F1F1',
        marginHorizontal: 40,
        marginVertical: 10
    },
    btn:{
        backgroundColor: '#49A1F9',
        marginHorizontal: 90,
        borderRadius: 20
    },
    loginText: {
        alignSelf: 'center',
        color: 'white',
        padding: 10,
        fontSize: 18
    },
    error: {
        textAlign: "center",
        color: "#f00",
        marginVertical: 10,
    },
    registerText:{
        alignSelf: 'center',
        color: 'blue',
        marginBottom: 20,
        fontSize: 16
    }
});
