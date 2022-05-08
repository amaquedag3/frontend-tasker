import { ImageBackground, StyleSheet, View, TextInput, Text, TouchableWithoutFeedback } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../../components/DatePicker';
import CustomDropdownPicker from '../../components/CustomDropdownPicker';
import Slider from '@react-native-community/slider';
import { RadioButton } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import CustomModal from '../../components/CustomModal';
import { createTask, getPhasesByProjectId, getUserProjects } from '../../../api';
import { find } from 'lodash';


export default function TaskForm() {
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    //const [description, setDescription] = useState('')
    const [date, setDate] = useState(undefined)
    const [expectedDuration, setDuration] = useState(0)
    const [priority, setPriority] = useState(0)

    const [projects, setProjects] = useState()
    const [project, setProject] = useState()
    const [phases, setPhases] = useState([])
    const [phase, setPhase] = useState()

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
            //TODO: validar que no sea una fecha anterior a la actual
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

    useEffect(async() => {
        loadProjects()
    }, [])

    const loadPhases = async() => {
        const data = await getPhasesByProjectId(project)
        console.log(data)
        if(data)
            setPhases(data)
    }

    useEffect(async() => {
        if(project)
            loadPhases()
    }, [project])

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
                                style={{width: '90%', height: 30, alignSelf: 'center'}}
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
                                style={{width: '90%', height: 30, alignSelf: 'center'}}
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
        marginVertical: 14
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginHorizontal: 40,
        marginVertical: 8
    },
    inputDate: {
        height: 40,
        width: '65%',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 20,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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
        marginTop: '4%',
        flexDirection: "row",
        alignSelf: 'center',
    },
    dropdownBox:{
        paddingHorizontal: 25,
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
        marginVertical: 2,
    },
    cleanOption:{
        fontSize: 16,
        color: '#003049', 
        backgroundColor: '#f77f00',
        width: '35%',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
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
