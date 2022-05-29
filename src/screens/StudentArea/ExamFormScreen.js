import { StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, {useState} from 'react'
import CustomModal from '../../components/CustomModal';
import CustomDateTimePicker from '../../components/CustomDateTimePicker';
import Slider from '@react-native-community/slider';
import { saveExam } from '../../../api';
import { useNavigation } from "@react-navigation/native";

//Formulario de Examen
export default function ExamFormScreen(props) {
    const {subject} = props.route.params;
    //estados del examen
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(new Date())
    const [calification, setCalification] = useState(5)
    //estados del formulario
    const [error, setError] = useState('')
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const navigation = useNavigation();
    //función que valida la entrada de datos
    function validateInput(){
        setError('')
        if(title == ''){
            setError('Introduce un titulo')
            return false
        }
        if(date == undefined){
            setError('Introduce una fecha válida')
            return false
        }
        if(calification < 0 || calification > 10){
            setError('Introduce una calificación valida')
            return false
        }
        return true
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    //función que se activa cuando se preciona el boton
    async function handleSubmit(){
        if(validateInput()){
            const newExam = {
                title: title,
                date: date,
                calification: calification,
                idSubject: subject.id
            }
            await saveExam(newExam)
            setModalText('!Examen guardado!')
            setModalVisible(true)
            wait(1500).then(() => navigation.goBack())
        }
    }

    return (
        
        <ImageBackground  source={require('../../../assets/sea.jpg')} style={styles.background}>
            {
                modalVisible ?
                <CustomModal 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    modalText={modalText}
                    setModalText={setModalText}/> 
                :<View/>
            }
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Formulario de examen de {subject.nombre}</Text>

                    <TextInput 
                        style={styles.input} 
                        placeholder='Titulo'
                        value={title}
                        onChangeText={(text) => setTitle(text)}/>

                    <CustomDateTimePicker inputDate={date} setInputDate={setDate}/>
                    
                    <View>
                        
                    <View style={styles.caificationBox}>
                        <Text style={{fontWeight: 'bold'}}>Calificación:  
                            <Text style={{fontWeight: 'normal'}}>{calification.toFixed(2)}</Text>
                        </Text>
                    </View>
                    
                    <Slider
                        minimumValue={0}
                        maximumValue={10}
                        step={0.1}
                        value={calification}
                        onValueChange={(value)=>{setCalification(value)}}
                        style={{width: '90%', height: 30, alignSelf: 'center'}}
                        minimumTrackTintColor="black"
                        maximumTrackTintColor="gray"
                    />
                    </View>

                    {
                        error ? 
                        <Text style={styles.error}>{error}</Text>
                        : <View/>
                    }
                
                <View style={styles.btn}>
                    <TouchableWithoutFeedback onPress={handleSubmit}>
                        <Text style={styles.buttonText}> Guardar </Text>
                    </TouchableWithoutFeedback>
                </View>

                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({   
    background: {
        width: '100%',
        height: '100%'
    },
    container: {
        padding: 20,
        height: '100%',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 150,
        marginTop: 140
    },
    input:{
        height: 40,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginVertical: 10,
        borderWidth: 1,
        marginHorizontal: 20
    },
    title : {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
        paddingVertical: 10,
        textAlign: 'center'
    },
    caificationBox: {
        alignItems: 'center'
    },
    error: {
        textAlign: "center",
        color: "#f00",
    },
    btn:{
        backgroundColor: '#4AD021',
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