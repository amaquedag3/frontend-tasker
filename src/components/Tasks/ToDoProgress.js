import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import CustomTimer from './CustomTimer';

export default function ToDoProgress(props) {
  const {tasks, setTasks, loadTasks, selectedTask, setSelectedTask, isPlaying, setPlay, duration, setDuration} = props

  return (
      <View style={styles.container}>
          {selectedTask ? 
          <CustomTimer
            tasks={tasks}
            loadTasks={loadTasks}
            setTasks={setTasks}
            selectedTask={selectedTask} 
            setSelectedTask={setSelectedTask}z
            isPlaying={isPlaying}
            setPlay={setPlay}
            duration={duration}
            setDuration={setDuration}/>:
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