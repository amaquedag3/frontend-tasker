import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import { createProject, updateProject } from '../../../api';
import useAuth from '../../hooks/useAuth';
import CustomModal from '../../components/CustomModal'

//Formulario de proyecto que puede ser llamado
// para crear o editar un proyecto
export default function ProjectForm(props) {
    //Si se edita un proyecto, se recibe su información por props
    let project;
    if(props.route.params != undefined){
      project = props.route.params.project
    }

    //Estados del proyecto
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [started, setStared] = useState(new Date())

    //Estados de la vista
    const [error, setError] = useState('')
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const { userData } = useAuth();
    const idUser = userData.id;

    const navigation = useNavigation();

    //Función que se activa al pulsar el botón de guardar
    const handleSubmit = () => {
        if(validateInputs()){
            saveProject()
        }
    }

    //Función que valida la entrada de datos
    const validateInputs = () => {
      setError('')
      if(title == ''){
          setError('Introduce un título')
          return false;
      }
      if(description == false){
        setError('Introduce una descripción')
        return false
      }
      return true;
  }

  //Función que guarda los datos del formulario
    //UPDATE o SAVE
  const saveProject = async () => {
    let res;
    if(project){
      project.title = title
      project.description = description
      res = await updateProject(project)
    }else {
      const newProject = {title, description, started, idUser}
      res = await createProject(newProject)
    }

    if(res.status != 200){
      setError(res.message)
    }else{
      setModalText('!Proyecto guardado!')
      setModalVisible(true)
      cleanInputs()
      navigation.navigate('ProjectsList')
    }
  }

  //Función que limpia los inputs del formulario
  function cleanInputs(){
    setTitle('')
    setDescription('')
  }

  //Función de carga los datos del proyecto a editar
  useEffect(() => {
    if(project){
      setTitle(project.title)
      setDescription(project.description)
    }
  }, [])
    

    return (
        <ImageBackground  source={require('../../../assets/sea.jpg')} style={styles.background}>
            <CustomModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                modalText={modalText}
                setModalText={setModalText}/>

            <View style={styles.container}>
              <View style={styles.form}>
              {
                project 
                ? <Text style={styles.title}>Edit de {project.title}</Text> 
                : <Text style={styles.title}>Formulario de Proyecto</Text> 
              }
              
              
              <TextInput 
                style={styles.inputTitle} 
                placeholder='Titulo'
                value={title}
                onChangeText={(text) => setTitle(text)}/>
              
              <TextInput 
                style={styles.inputDescription} 
                placeholder='Descripción'
                value={description}
                multiline={true}
                onChangeText={(text) => setDescription(text)}/>
              
              {
                error ? <Text style={styles.error}>{error}</Text> : <View/>
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
      marginTop: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
      padding: 10,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      marginVertical: 10,
      borderWidth: 1
    },
    inputDescription: {
      marginTop: 10,
      marginBottom: 40,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      fontSize: 15,
      paddingHorizontal: 10,
      height: 140,
      borderWidth: 1
    },
    error: {
      textAlign: "center",
      color: "#f00",
    },
    btn:{
      backgroundColor: '#4AD021',
      marginHorizontal: 90,
      marginBottom: 15,
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