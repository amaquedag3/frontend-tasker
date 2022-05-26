import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback} from 'react-native'
import React, {useEffect, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteExam } from '../../../api';

export default function ExamCard(props) {
  const {exam, getExams} = props;
  //color de la nota
  const [pillColor, setPillColor] = useState();

  const pill = { backgroundColor: pillColor, ...styles.pill };
  //funcion que limina el examen
  const handleDeleteExam = () => {
    return Alert.alert(
        "Eliminando examen...",
        "¿Estas seguro de que quieres eliminar este examen?",
        [
            {
                text: "Sí",
                onPress: async () => { 
                    await deleteExam(exam.id)
                    await getExams()
                },
            },{text: "No"},
        ]
    );
}

  useEffect(() => {
      if(exam.calificacion < 5){
        setPillColor('rgba(255, 34, 23, 0.7)') 
      }else if(exam.calificacion > 8){
        setPillColor('rgba(60, 179, 113, 07)')
      }else{
        setPillColor('rgba(255, 165, 0, 0.7)')
      }
  })

  return (
    <View style={styles.container}>
      <View style={styles.titleContainter}>
        <Text style={styles.title}>{exam.titulo}</Text>
      </View>
      <View style={pill}><Text style={styles.calificacion}>{exam.calificacion}</Text></View>
      <View style={styles.iconBox} >
          <TouchableWithoutFeedback onPress={handleDeleteExam}>
            <Ionicons name="trash-outline"  size={23} style={styles.icon} /> 
          </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      margin: 5,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center'
  },
  titleContainter:{
    width: '73%'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',

  },
  pill: {
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    width: 30,
    height: 30,
    position: 'absolute',
    right: 45,
  },
  calificacion: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconBox: {
    position: 'absolute',
    padding: 10,
    right: 0
  },
  icon:{
      color: 'red',
  }
})