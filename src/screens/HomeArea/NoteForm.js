import { View, Text, StyleSheet,ImageBackground, TouchableWithoutFeedback , TextInput, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomDateTimePicker from '../../components/CustomDateTimePicker';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { insertReminder } from '../../utils/sqliteDb';
import CustomModal from '../../components/CustomModal';


export default function NoteForm(props) {
    const {reminder} = props;
    const { userData } = useAuth()

    const [content, setContent] = useState('' );
    const [date, setDate] = useState(new Date())

    const [error, setError] = useState();
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const navigation = useNavigation();

    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    const handleSubmit = async() => {
        if(validateInput()){
            await insertReminder({
                content: content,
                date: date,
                active: false,
                idUser: userData.id
            })
            setModalText('!Recordatorio guardado!')
            setModalVisible(true)
            wait(1000).then(() => navigation.goBack());
        }
    }

    function validateInput(){
        setError('')
        if(content == ''){
            setError('Introduce un contenido')
            return false
        }

        if(date < new Date()){
            setError('No puedes introducir una fecha pasada')
            return false
        }
        return true
    }

    return (
        <>
            {
                modalVisible ?
                <CustomModal
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    modalText={modalText}
                    setModalText={setModalText}/>
                : <View/>
            }
            <ImageBackground style={styles.background} source={require('../../../assets/medusa.jpg')} >
                <View style={styles.container}>
                    <Text style={styles.title}>Formulario de Recordatorio</Text>
                    <TextInput  
                        placeholder='Contenido'
                        value={content}
                        onChangeText={(text) => setContent(text)}
                        style={styles.input}/>
                    
                    <View>
                        <CustomDateTimePicker inputDate={date} setInputDate={setDate}/>
                    </View>

                    {
                        error ? <Text style={styles.error}>{error}</Text> : <View/> 
                    }
                    

                    <View style={styles.btn}>
                        <TouchableWithoutFeedback onPress={handleSubmit}>
                            <Text style={styles.buttonText}> Guardar </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}


const styles = StyleSheet.create({
    background:{
        width: '100%',
        height: '100%',
    },
    container:{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        marginHorizontal: 30,
        marginTop: '30%',
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'Roboto',
        marginVertical: 10,
        paddingHorizontal: '5%'
    },input: {
        borderWidth: 1,
        padding: 3,
        borderRadius: 20,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginVertical: 8
    },
    calendar:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        alignSelf: 'center'
    },
    error: {
        textAlign: "center",
        color: "#f00",
        marginVertical: 10,
        fontSize: 14
    },
    btn:{
        backgroundColor: '#49A1F9',
        marginHorizontal: 90,
        marginVertical: 15,
        borderRadius: 20,
        alignItems: 'center'
    },
    buttonText:{
        alignSelf: 'center',
        color: 'white',
        padding: 8,
        fontSize: 15
    }
})