import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import DayPicker from '../../components/DayPicker';
import CustomSliderDuration from '../../components/CustomSliderDuration';
import { saveSubject } from '../../../api';
import useAuth from '../../hooks/useAuth';
import CustomModal from '../../components/CustomModal';
import { useNavigation } from '@react-navigation/native';

//Formulario de Asignatura
export default function SubjectFormScreen() {
  //Estado de la asignatura
  const [name, setName] = useState()
  const [duration, setDuration] = useState()
  const { userData } = useAuth();
  const idUser = userData.id;
  //estadi del formulario
  const [error, setError] = useState()
  const [modalVisible, setModalVisible] = useState("");
  const [modalText, setModalText] = useState("");
  const navigation = useNavigation();

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  //Funcino que se activa cuando se presina el boton
  const handleSubmit = () => {
    if(validateInput()){
      createSubject()
      setModalText('!Asignatura guardada!')
      setModalVisible(true)
      wait(1500).then(() => navigation.navigate('StudentHome'));
    }
  }
  //Funcion que guarda una asignatura
  const createSubject = async () => {
    const newSubject ={   
        'name': name, 
        'schdule': '',
        'duration': duration, 
        'idUser': idUser
    }
    await saveSubject(newSubject)
  }

  //Función que valida los campos 
  function validateInput(){
    if(name == ''){
      setError('Introduce un nombre de asignatura')
      return false
    }

    if(duration < 30){
      setError('La clase debe durar al menos 30 minutos')
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
      <ImageBackground source={require('../../../assets/sea.jpg')} style={styles.background}> 
        <View style={styles.container}>
            <Text style={styles.title}>Formulario de Asignatura</Text>
          
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              autoCapitalize="none"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            {/*
            <View style={styles.dayPickerBox}>
              <Text style={styles.subTitle}>Horario: </Text>
              <DayPicker schedule={schedule} setSchedule={setSchedule}/>
            </View>
            <CustomSliderDuration setDuration={setDuration}/>
            */}

            {
              error ?
              <Text style={styles.error}>{error}</Text> :
              <Text></Text>
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
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: '12%',
    marginHorizontal: '8%',
    borderRadius: 20
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    height: 38,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 40,
  },
  dayPickerBox: {
    marginVertical: '4%'
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "bold",
    paddingLeft: '6%',
    marginBottom: '2%'
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginVertical: '3%',
  },
  btn:{
      backgroundColor: '#49A1F9',
      marginHorizontal: '25%',
      marginTop: '6%',
      marginBottom: '4%',
      borderRadius: 20,
      alignItems: 'center'
  },
  buttonText:{
      alignSelf: 'center',
      color: 'white',
      padding: '4%',
      fontSize: 15
  }
})