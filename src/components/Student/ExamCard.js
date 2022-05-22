import { View, Text, StyleSheet, } from 'react-native'
import React, {useEffect, useState} from 'react'

export default function ExamCard(props) {
  const {exam} = props;

  const [pillColor, setPillColor] = useState();

  const pill = { backgroundColor: pillColor, ...styles.pill };

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
      <Text style={styles.title}>{exam.titulo}</Text>
      <View style={pill}><Text style={styles.calificacion}>{exam.calificacion}</Text></View>
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
    right: 10,
  },
  calificacion: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
})