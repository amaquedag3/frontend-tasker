
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {StyleSheet, ImageBackground, Button,} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ToDoTaskList from '../../components/Tasks/ToDoTaskList';
import ToDoProgress from '../../components/Tasks/ToDoProgress';
import { getUserTasks } from '../../../api'
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
    const data = await getUserTasks(userData.user.id)
    if(data){
      if(task){
        remove(tasks, function(item){
          return item === task;
        })
        console.log('Con seleccionado quitado', tasks)
        setTasks(orderBy(tasks,['priority'], ['desc']))
        
      }else{
        console.log('No habia seleccionada')
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
        <Button title="Tareas acabadas" />
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background:{
    width: '100%',
    height: '100%'
  },
});
