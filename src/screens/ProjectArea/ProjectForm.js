import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import { saveProject } from '../../../api';
import useAuth from '../../hooks/useAuth';
import CustomModal from '../../components/CustomModal'



export default function ProjectForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [started, setStared] = useState(new Date())

    const [error, setError] = useState('')
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const { userData } = useAuth();
    const idUser = userData.id;

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
      if(description == false){
        setError('Introduce una descripción')
        return false
      }
      return true;
  }

    const createProject = async () => {
      const newProject = {title, description, started, idUser}
      const res = await saveProject(newProject)
      if(res.status != 200){
          setError(res.message)
      }else{
          setModalText('!Proyeto creado!')
          setModalVisible(true)
          cleanInputs()
          navigation.navigate('ProjectsList')
      }
    }

    function cleanInputs(){
      setTitle('')
      setDescription('')
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
      marginVertical: 10
    },
    inputDescription: {
      marginTop: 10,
      marginBottom: 40,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      fontSize: 15,
      height: 140,
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