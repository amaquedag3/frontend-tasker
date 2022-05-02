import { View, Text, TextInput, StyleSheet, Button, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import DatePicker from '../../components/DatePicker'
import { saveProject } from '../../../api';
import useAuth from '../../hooks/useAuth';
import CustomModal from '../../components/CustomModal'



export default function ProjectForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [started, setStarted] = useState(undefined)
    const [error, setError] = useState('')

    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const { userData } = useAuth();
    const idUser = userData.user.id;

    const navigation = useNavigation();

    const handleSubmit = () => {
        if(validateInputs()){
          createProject()
        }
    }

    const validateInputs = () => {
      setError('')
      if(title == ''){
          setError('Introduce un título')
          return false;
      }
      if(started == undefined){
          setError('Introduce una fecha')
          return false;
          //TODO: validar que no sea una fecha anterior a la actual
      }
      if(description == false){
        setError('Introduce una descripción')
      }
      return true;
  }

    const createProject = async () => {
      const newProject = {title, description, started, idUser}
      console.log(newProject)
      const res = await saveProject(newProject)
      if(res.status != 200){
          setError(res.message)
      }else{
          setModalText('!Proyeto creado!')
          setModalVisible(true)
          cleanInputs()
          navigation.navigate('ProjectsList')
      }
      console.log(res)
    }

    function cleanInputs(){
      setTitle('')
      setDescription('')
      setStarted('')
    }

    return (
        <ImageBackground  source={require('../../../assets/sea.jpg')} style={styles.background}>
            <CustomModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                modalText={modalText}
                setModalText={setModalText}/>

            <View style={styles.container}>
              <View style={styles.form}>
              <Text style={styles.title}>Formulario de Proyecto</Text>
              
              <TextInput 
                style={styles.inputTitle} 
                placeholder='Titulo'
                value={title}
                onChangeText={(text) => setTitle(text)}/>
              
              <View style={styles.calendar}>
                <TextInput
                  placeholder="Fecha"
                  style={styles.inputDate}
                  editable={false}>   
                  {started}                             
                </TextInput>
                <DatePicker setDate={setStarted}/>
              </View>  
              
              <TextInput 
                style={styles.inputDescription} 
                placeholder='Descripción'
                value={description}
                multiline={true}
                onChangeText={(text) => setDescription(text)}/>
              
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
    background: {
      width: '100%',
      height: '100%'
    },
    container: {
      padding: 20,
      height: '100%',
    },
    form: {
      marginTop: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      paddingHorizontal: 20,
      borderRadius: 30,
      elevation: 150,
    },
    title : {
      marginTop: 30,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      alignSelf: 'center',
      fontSize: 20,
      color: 'black',
    },
    inputTitle: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#F2F1F1',
      marginVertical: 10
    },
    inputDate: {
      height: 40,
      width: '82%',
      borderWidth: 1,
      paddingLeft: 10,
      borderRadius: 20,
      backgroundColor: '#F2F1F1',
      marginRight: 10,
      marginVertical: 10,
      color: 'black'
    },    
    calendar:{
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection:'row',
    },
    inputDescription: {
      marginTop: 10,
      marginBottom: 40,
      borderRadius: 10,
      backgroundColor: 'white',
      fontSize: 15,
      height: 140,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
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
        padding: 10,
        fontSize: 18
    }
})