import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Progress from 'react-native-progress';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import CustomTimer from './CustomTimer';

export default function ToDoProgress(props) {
  const {selectedTask, setSelectedTask} = props
  console.log(selectedTask)

  return (
      <View style={styles.container}>
          {selectedTask ? <CustomTimer selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>:
          <View>
            <Image style={styles.icon} source={require('../../../assets/pikachu2.png')}/>
            <Text style={styles.text}>Seleciona una tarea</Text>
          </View>
          }     
      </View>
  )

}

const styles = StyleSheet.create({
  container: {
    height: '40%',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    
  },
  icon: {
    width: 140,
    height: 140,
    position: 'absolute',
    marginTop: -100,
    marginLeft: 20
  }
});