import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { APIregister } from '../../../api';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomModal from '../../components/CustomModal';

export default function RegisterScreen() {
    //Estados del usuario
    const [firstname, setFirstname] = useState("");
    const [lastname, setLasttname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("")
   //Estados del formulario
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");
    //Variable que permite la navegación entre pantallas
    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    //Validación de entrada de campos
    function validateInput(){
        setError('')
        if(firstname == '' || lastname == '' || email == '' || password == '' || password2 == ''){
            setError('Introduce todos los campos')
            return false;
        }
        if(password != password2){
            setError('Las contraseñas no coinciden')
            return false;
        }
        return true
    }

     //Metodo que maneja la respuesta de la API
    const registerResponse = async () => {
        const newUser = {firstname, lastname, email, password}
        const res = await APIregister(newUser)
        if(res.status != 200){
            setError(res.message)
        }else{
            setModalText('¡Usuario registrado!')
            setModalVisible(true)
            cleanInputs()
        }
    }

    //Metodo que limpia los inputs
    function cleanInputs(){
        setFirstname('')
        setLasttname('')
        setEmail('')
        setPassword('')
        setPassword2('')
    }

    //Metodo que se activa al presionar el botón
    function handleSubmit(){
        if(validateInput()){
            registerResponse();
        }
    }


    return (
        <ImageBackground source={require('../../../assets/leaf.jpg')} style={styles.background}>
            <CustomModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                modalText={modalText}
                setModalText={setModalText}/>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.title}>Register</Text>
                        <TextInput
                            placeholder="Nombre"
                            style={styles.input}
                            autoCapitalize="none"
                            value={firstname}
                            onChangeText={(text) => setFirstname(text)}
                        />
                        <TextInput
                            placeholder="Apellidos"
                            style={styles.input}
                            autoCapitalize="none"
                            value={lastname}
                            onChangeText={(text) => setLasttname(text)}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            placeholder="Contraseña"
                            style={styles.input}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput
                            placeholder="Repite contraseña"
                            style={styles.input}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            value={password2}
                            onChangeText={(text) => setPassword2(text)}
                        />
                        <Text style={styles.error}>{error}</Text>

                        <View style={styles.btn}>
                            <TouchableWithoutFeedback onPress={handleSubmit}>
                                <Text style={styles.registerText}> Registrarse </Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <SafeAreaView>
                            <TouchableWithoutFeedback onPress={goToLogin}>
                                <Text style={styles.loginText}>Inicia sesión aquí</Text>
                            </TouchableWithoutFeedback>
                        </SafeAreaView>
                    </View>
                </View>
        </ImageBackground>
    )
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
    form: {
        marginTop: '15%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 30,
        elevation: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 20
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
    error: {
        textAlign: "center",
        color: "#f00",
        marginVertical: 10,
    },
    btn:{
        backgroundColor: '#49A1F9',
        marginHorizontal: 90,
        borderRadius: 20
    },
    registerText:{
        alignSelf: 'center',
        color: 'white',
        padding: 10,
        fontSize: 18
    },
    loginText: {
        alignSelf: 'center',
        color: 'blue',
        marginBottom: 20,
        fontSize: 16
    }
})