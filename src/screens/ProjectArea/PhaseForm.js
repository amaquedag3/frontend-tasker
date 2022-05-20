import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatePicker from '../../components/DatePicker';
import { savePhase, updatePhase } from '../../../api';
import CustomModal from '../../components/CustomModal';
import { useNavigation } from "@react-navigation/native";
import { wait } from '../../utils/wait';


export default function PhaseForm(props) {
    const {project, phase} = props.route.params;

    const [error, setError] = useState('')
    const [title, setTitle] = useState('')

    const [description, setDescription] = useState()
    const [date, setDate] = useState(undefined)
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const navigation = useNavigation();


    const handleSubmit = async() => {
        if(validateInput()){
            setError('')
            if(phase){
                phase.title = title
                phase.description = description
                phase.date = date
                await updatePhase(phase)
                setModalText('!Tarea editada!')
            }else{
                const newPhase = {
                    'title': title,
                    'description': description, 
                    'started': date,
                    'idProject': project.id
                }
                await savePhase(newPhase)
                setModalText('!Fase de proyecto guardada!')
            }
            setModalVisible(true)
            cleanInputs()
            await wait(2000)
            navigation.goBack()
        }
    }
    
    function cleanInputs() {
        setTitle('')
        setDescription('')
        setDate('')
    }

    function validateInput() {
        setError('')
        if(title == ''){
            setError('Introduce un título')
            return false;
        }
        if(date == undefined){
            setError('Introduce una fecha')
            return false;
        }
        
        if(new Date(date) > project.started || date < new Date(0)){
            setError('Selecciona una fecha valida')
            return false
        }
        return true
    }


    useEffect(()=> {
        if(phase){
            setTitle(phase.title)
            setDescription(phase.description)
            setDate(phase.started.split('T')[0])
        }
    }, [])



    return (
        <ImageBackground source={require('../../../assets/desktop.jpg')} style={styles.background}>
            <CustomModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                modalText={modalText}
                setModalText={setModalText}/>
            
            <View style={styles.container}>
                <View style={styles.form}>
                    {phase ? <Text style={styles.title}>Edit de fase {phase.title } </Text>
                    : <Text style={styles.title}>Nueva fase de {project.title }</Text>}
                    <TextInput
                        placeholder="Titulo"
                        style={styles.input}
                        autoCapitalize="none"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <TextInput
                        placeholder="Descripción"
                        style={styles.input}
                        autoCapitalize="none"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
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
        height: '60%'
    },
    form: {
        marginTop: -150,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 30,
        elevation: 150,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
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
        width: '50%',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 20,
        backgroundColor: '#F2F1F1',
        marginLeft: 40,
        marginRight: 10,
        marginVertical: 10,
        color: 'black',
        textAlign: 'center'
    },
    calendar:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        justifyContent: 'center'
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