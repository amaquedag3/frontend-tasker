
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {StyleSheet, ImageBackground, Button, View, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ToDoTaskList from '../../components/Tasks/ToDoTaskList';
import ToDoProgress from '../../components/Tasks/ToDoProgress';
import { getUserTasks, getUserTodoTasks } from '../../../api'
import useAuth from '../../hooks/useAuth';
import ButtonAdd from '../../components/ButtonAdd';
import { orderBy, remove } from "lodash";


export default function TaskScreen() {
  const [tasks, setTasks] = useState(undefined)
  const [range, setRange] = useState('Hoy')
  const [selectedTask, setSelectedTask] = useState(undefined)
  const [isPlaying, setPlay] = useState(false)
  const [duration, setDuration] = useState(0)

  const { userData } = useAuth()
  const navigation = useNavigation();
  
  const loadTasks = async(task) => {
    const data = await getUserTodoTasks(userData.user.id)
    if(data){
      if(task){
        remove(tasks, function(item){
          return item === task;
        })
        setTasks(orderBy(tasks,['priority'], ['desc']))
        
      }else{
        setTasks(orderBy(data,['priority'], ['desc']))
      }
    }
      
  }

  useEffect(()=> {
    loadTasks()
  }, [])

  return (
    <ImageBackground source={require('../../../assets/sun-flower.jpg')} style={styles.background}>
      <SafeAreaView>
          <ToDoTaskList 
            tasks={tasks}
            setTasks={setTasks}
            loadTasks={loadTasks} 
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            duration={duration}
            setDuration={setDuration}
            range={setRange} 
            setRange={setRange}
            isPlaying={isPlaying}
            setPlay={setPlay}/>
            {
              tasks == undefined || tasks.length == 0 ? <View style={styles.pill}><Text style={styles.text}>No tienes tareas pendientes</Text></View>
              : <View></View>
            }
        <View style={{marginHorizontal: 120, marginVertical: 10}}>
          <Button title="Tareas acabadas" onPress={() => {navigation.navigate('EndedTasks')}}/>
        </View>
        <ToDoProgress 
          tasks={tasks}
          setTasks={setTasks}
          loadTasks={loadTasks}
          selectedTask={selectedTask} 
          setSelectedTask={setSelectedTask}
          duration={duration}
          setDuration={setDuration}
          isPlaying={isPlaying}
          setPlay={setPlay}/>
        <ButtonAdd action={() => {navigation.navigate('Form')}}/>
        
        
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background:{
    width: '100%',
    height: '100%'
  },
  text:{
    fontSize: 18, 
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  pill:{
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: '3%',
    width: '80%',
    position: 'absolute',
    marginTop: '30%',
    alignSelf: 'center', 
    borderRadius: 30,
    justifyContent: 'center'
  }
});
