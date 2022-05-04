import { ImageBackground, StyleSheet, View, TextInput, Text, TouchableWithoutFeedback } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../../components/DatePicker'
import Slider from '@react-native-community/slider';
import { RadioButton } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import CustomModal from '../../components/CustomModal';
import { createTask } from '../../../api';


export default function TaskForm() {
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    //const [description, setDescription] = useState('')
    const [date, setDate] = useState(undefined)
    const [expectedDuration, setDuration] = useState(0)
    const [priority, setPriority] = useState(0)
    const [projectPhase, setProjectPhase] =  useState(undefined)
    //TODO: Posibilidad que la tarea esté vinculada a un proyecto

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");
    const navigation = useNavigation();
    const { userData } = useAuth();
    const idUser = userData.user.id;

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const handleSubmit = () => {
        if(validateInput()){
            saveTask()
            setModalText('!Tarea guardada!')
            setModalVisible(true)
            wait(1000).then(() => navigation.navigate('Main'));
        }
    }

    const saveTask = async () => {
        const newTask ={   
            'title': title, 
            'date': date,
            'expectedDuration': expectedDuration, 
            'idUser': idUser, 
            'projectPhase': projectPhase,
            'priority': priority,
            'idUser': idUser
        }
        
        await createTask(newTask)
    }

    const validateInput = () => {
        setError('')
        setDuration(0)
        if(title == ''){
            setError('Introduce un título')
            return false;
        }
        if(date == undefined){
            setError('Introduce una fecha')
            return false;
            //TODO: validar que no sea una fecha anterior a la actual
        }
        if(expectedDuration < 5){
            setError('Una tarea debe durar al menos 5 minutos')
            return false;
        }

        return true;
    }

    return (
        <ImageBackground source={require('../../../assets/desktop.jpg')} style={styles.background}>
            <CustomModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                modalText={modalText}
                setModalText={setModalText}/>
            <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.title}>Nueva Tarea</Text>
                        <TextInput
                            placeholder="Contenido"
                            style={styles.input}
                            autoCapitalize="none"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <View style={styles.calendar}>
                            <TextInput
                                placeholder="Fecha"
                                style={styles.inputDate}
                                autoCapitalize="none"
                                editable={false}>   
                                {date}                             
                            </TextInput>
                            <DatePicker setDate={setDate}/>
                        </View>
                        
                        <View>
                            <Text style={styles.sliderTitle}>Duración</Text>

                            <View style={{
                                borderColor: 'black',
                                borderWidth: 0.5,
                                marginHorizontal: 20, 
                                borderRadius: 15
                                }}>
                            <Text style={styles.sliderLabel}>{hours} Horas</Text>
                            <Slider
                                style={{width: '90%', height: 40, alignSelf: 'center'}}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor="black"
                                maximumTrackTintColor="#000000"
                                step={1}
                                onValueChange={(value)=>{setHours(value)}}
                                onSlidingComplete={() => {setDuration(60 * hours + minutes)}}
                            />
                            <Text style={styles.sliderLabel}>{minutes} Minutos</Text>
                            <Slider
                                style={{width: '90%', height: 40, alignSelf: 'center'}}
                                minimumValue={0}
                                maximumValue={59}
                                minimumTrackTintColor="black"
                                maximumTrackTintColor="#000000"
                                step={1}
                                onValueChange={(value)=>{setMinutes(value)}}
                                onSlidingComplete={() => {setDuration(60 * hours + minutes)}}
                            />
                            </View>
                        </View>
                        <View style={styles.priorityBox}>
                            <Text style={styles.sliderTitle}>Prioridad:   </Text>
                            <RadioButton value={0} status={ priority === 0 ? 'checked' : 'unchecked' } 
                                onPress={() => setPriority(0)} uncheckedColor='green' color='green'/>
                            <RadioButton value={1} status={ priority === 1 ? 'checked' : 'unchecked' } 
                                onPress={() => setPriority(1)} uncheckedColor='blue' color='blue'/>
                            <RadioButton value={2} status={ priority === 2 ? 'checked' : 'unchecked' } 
                                onPress={() => setPriority(2)} uncheckedColor='yellow' color='yellow'/>
                            <RadioButton value={3} status={ priority === 3 ? 'checked' : 'unchecked' } 
                                onPress={() => setPriority(3)} uncheckedColor='red' color='red'/>
                        </View>
                        <Text style={styles.error}>{error}</Text>
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
    background:{
        width: '100%',
        height: '100%'
    },
    container:{
        padding: 20,
        height: '100%',
    },
    form: {
        marginTop: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 30,
        elevation: 150,
    },
    title: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: 'Roboto',
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
    inputDate: {
        height: 40,
        width: '65%',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 20,
        backgroundColor: '#F2F1F1',
        marginLeft: 40,
        marginRight: 10,
        marginVertical: 10,
        color: 'black'
    },
    sliderTitle:{
        alignSelf: 'center',
        fontSize: 18
    },
    sliderLabel:{
        marginTop:'2%',
        marginLeft: '15%'
    },
    inputDuration: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F2F1F1',
        marginHorizontal: 40,
        marginVertical: 10,
        alignSelf: 'center'
    },
    calendar:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    priorityBox:{
        marginTop: '7%',
        flexDirection: "row",
        alignSelf: 'center',
    },    
    error: {
        textAlign: "center",
        color: "#f00",
        marginVertical: 10,
    },
    btn:{
        backgroundColor: '#49A1F9',
        marginHorizontal: 90,
        marginBottom: 15,
        borderRadius: 20,
        alignItems: 'center'
    },
    buttonText:{
        alignSelf: 'center',
        color: 'white',
        padding: 10,
        fontSize: 18
    }
})
