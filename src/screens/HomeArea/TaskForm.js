import { ImageBackground, StyleSheet, View, TextInput, Text, TouchableWithoutFeedback } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomDropdownPicker from '../../components/CustomDropdownPicker';

import { RadioButton } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import CustomModal from '../../components/CustomModal';
import { createTask, getPhasesByProjectId, getUserProjects } from '../../../api';
import { find } from 'lodash';
import CustomDateTimePicker from '../../components/CustomDateTimePicker';
import CustomSliderDuration from '../../components/CustomSliderDuration';



export default function TaskForm() {
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(new Date())
    const [expectedDuration, setDuration] = useState(0)
    const [priority, setPriority] = useState(0)

    const [projects, setProjects] = useState()
    const [project, setProject] = useState()
    const [phases, setPhases] = useState([])
    const [phase, setPhase] = useState()

    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");
    const navigation = useNavigation();
    const { userData } = useAuth();
    const idUser = userData.id;

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

    const handleCleanSubmit = () => {
        setProject(undefined)
        setPhases([])
    }

    const saveTask = async () => {
        const newTask ={   
            'title': title, 
            'date': date,
            'expectedDuration': expectedDuration, 
            'idUser': idUser, 
            'projectPhase': phase,
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
        }
        if(date < new Date()){
            setError('Introduce una fecha y hora validas')
            return false;
        }

        if(expectedDuration < 5){
            setError('Una tarea debe durar al menos 5 minutos')
            return false;
        }
        return true;
    }

    const loadProjects = async() => {
        const data = await getUserProjects(idUser)
        if(data)
            setProjects(data)
    }

    const loadPhases = async() => {
        const data = await getPhasesByProjectId(project)

        if(data)
            setPhases(data)
    }

    useEffect(async() => {
        if(project)
            loadPhases()

    }, [project])

    useEffect(async() => {
        loadProjects()
    }, [])

    

    return (
        <ImageBackground source={require('../../../assets/desktop.jpg')} style={styles.background}>
            {
                modalVisible ?
                <CustomModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                modalText={modalText}
                setModalText={setModalText}/>
                : <View/>
            }
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
                            <CustomDateTimePicker inputDate={date} setInputDate={setDate}/>
                        </View>
                        
                        <CustomSliderDuration setDuration={setDuration}/>
                
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

                        {project == undefined ?
                        <View style={styles.dropdownBox}>
                                <CustomDropdownPicker
                                    placeholder={'Selecciona un proyecto'}
                                    options={projects}
                                    setSelection={setProject}/>
                        </View>
                        : <Text style={styles.selectedOption}>Proyecto: {find(projects, {id: project}).title}</Text>
                        }

                        {project && phases.length > 0
                        ?<View style={styles.dropdownBox}>
                            <CustomDropdownPicker
                                placeholder={'Selecciona una fase'}
                                options={phases}
                                setSelection={setPhase}/>
                        </View>
                        :<Text/>
                        }
                        
                        
                        {project && phases == 0 
                        ?<View>
                            <Text style={styles.errorProject}>Este proyecto no tiene fases</Text>
                            <Text style={styles.errorProject}>Agregalas desde la sección de proyectos</Text>
                        </View>
                        :<Text/>
                        }

                        {project ?
                            <TouchableWithoutFeedback onPress={handleCleanSubmit}>
                                <Text style={styles.cleanOption}> Quitar Fase </Text>
                            </TouchableWithoutFeedback>
                        : <Text/>
                        }
                        
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
    background:{
        width: '100%',
        height: '100%'
    },
    container:{
        paddingHorizontal: '5%',
        marginBottom: '25%'
    },
    form: {
        marginTop: '18%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 30,
        elevation: 150,
    },
    title: {
        textAlign: "center",
        fontSize: 23,
        fontWeight: "bold",
        marginVertical: 10
    },
    input: {
        height: 38,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginHorizontal: 40,
    },

    inputDuration: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginHorizontal: 40,
        marginVertical: 10,
        alignSelf: 'center'
    },
    calendar:{
        paddingHorizontal: 35,
        justifyContent: 'center',
    },
    priorityBox:{
        marginTop: '4%',
        flexDirection: "row",
        alignSelf: 'center',
    },
    dropdownBox:{
        paddingHorizontal: '10%',
        paddingVertical: 10
    },
    selectedOption:{
        alignSelf: 'center',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 17,
        color: '#003049'
    },errorProject: {
        textAlign: "center",
        color: "#f00",
        marginVertical: '1%',
    },
    cleanOption:{
        fontSize: 16,
        marginVertical: '2%',
        color: '#003049', 
        backgroundColor: '#f77f00',
        width: '35%',
        borderRadius: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        padding: '2%'
    },
    error: {
        textAlign: "center",
        color: "#f00",
        marginVertical: '3%',
    },
    btn:{
        backgroundColor: '#49A1F9',
        marginHorizontal: '25%',
        marginBottom: '4%',
        borderRadius: 20,
        alignItems: 'center'
    },
    buttonText:{
        alignSelf: 'center',
        color: 'white',
        padding: '4%',
        fontSize: 17
    }
})
