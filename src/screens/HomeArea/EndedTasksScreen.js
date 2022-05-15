import { View, Text, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import useAuth from '../../hooks/useAuth';
import { getUserEndedTasks } from '../../../api';
import { orderBy } from "lodash";
import EndedTaskList from '../../components/Tasks/EndedTaskList';

export default function EndedTasksScreen() {
    const [tasks, setTasks] = useState()
    const { userData } = useAuth()

    const loadTasks = async() => {
        const data = await getUserEndedTasks(userData.user.id)
        if(data){
            setTasks(orderBy(data,['priority'], ['desc']))
        }
    }
    
    useEffect(()=> {
        loadTasks()
    }, [])

    return (
        <ImageBackground  source={require('../../../assets/moon.jpg')} style={styles.background}>
            <View style={styles.container}>
                <EndedTaskList tasks={tasks} loadTasks={loadTasks}/>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%'
    },
    container:{
        marginHorizontal: 20,
        marginVertical: 50,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        height: '80%'
    },
})