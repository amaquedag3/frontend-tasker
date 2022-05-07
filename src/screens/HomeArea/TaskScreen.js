
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {StyleSheet, ImageBackground, Button,} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ToDoTaskList from '../../components/Tasks/ToDoTaskList';
import ToDoProgress from '../../components/Tasks/ToDoProgress';
import { getUserTasks } from '../../../api'
import useAuth from '../../hooks/useAuth';
import ButtonAdd from '../../components/ButtonAdd';
import { orderBy } from "lodash";


export default function TaskScreen() {
  const [tasks, setTasks] = useState(undefined)
  const [range, setRange] = useState('Hoy')
  const [selectedTask, setSelectedTask] = useState(undefined)

  const { userData } = useAuth()
  const navigation = useNavigation();
  
  const loadTasks = async() => {
    const data = await getUserTasks(userData.user.id)
    if(data)
      setTasks(orderBy(data,['priority'], ['desc']))
  }

  const filterTasks = () => {
    console.log('Filtrado: ', range)
  }

  useEffect(()=> {
    loadTasks()
    filterTasks()
  }, [range])

  return (
    <ImageBackground source={require('../../../assets/sun-flower.jpg')} style={styles.background}>
      <SafeAreaView>
          <ToDoTaskList 
            tasks={tasks} 
            loadTasks={loadTasks} 
            setSelectedTask={setSelectedTask}
            range={setRange} 
            setRange={setRange}/> 
        <ToDoProgress selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
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
