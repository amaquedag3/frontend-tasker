import {View, StyleSheet, Text, TouchableWithoutFeedback, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import { deleteTask } from "../../../api";
import CustomModal from '../CustomModal';
import { orderBy, find, indexOf } from "lodash";

export default function ToDoTaskCard(props) {
    const {task, setTasks, tasks, loadTasks, selectedTask, setSelectedTask, isPlaying, setPlay, duration, setDuration} = props;
    const {date} = task;

    const [textPriority, setTextPriority] = useState('')
    const [colorPriority, setColorPriority] = useState('')
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const pill = {backgroundColor: colorPriority, ...styles.pill };

    useEffect(async() => {
        setCardPriority()
    }, [])

    const handleDeleteTask = () => {
        return Alert.alert(
            "Elimnando tarea...",
            "¿Estas seguro de que quieres eliminar esta tarea?",
            [
                {
                    text: "Sí",
                    onPress: async () => { 
                        console.log('eliminando tarea ...', task.id)
                        await deleteTask(task.id)
                        await loadTasks()
                    },
                },{text: "No"},
            ]
        );
    }

    const handleSelection = async() => {
        if(selectedTask === undefined){
            setSelectedTask(task)
            setDuration(0)
            setPlay(false)
            await loadTasks(task)
        }else{
            setModalText('Ya hay una tarea seleccionada')
            setModalVisible(true)
        }
        
    }
    
    
    const setCardPriority = () => {
        switch (task.priority) {
            case 0:
                setTextPriority('Prioridad baja')
                setColorPriority('rgba(60, 179, 113, 07)')
                break;
            case 1:
                setTextPriority('Prioridad media')
                setColorPriority('rgba(47, 68, 255, 0.7)')
                break;
            case 2:
                setTextPriority('Prioridad alta')
                setColorPriority('rgba(255, 165, 0, 0.7)')
                break;
            case 3:
                setTextPriority('Urgente')
                setColorPriority('rgba(255, 34, 23, 0.7)')
                break;
        }
    }

    
    return (
        <>
        <CustomModal 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    modalText={modalText}
                    setModalText={setModalText}/>
        <TouchableWithoutFeedback onLongPress={handleSelection}>
            <View style={styles.card}>
                <View style={styles.spacing}>
                    <Text style={styles.hour}> {date.split('T')[1].slice(0, 5)}</Text>
                    <Text style={styles.title}>{task.title}</Text>
                    
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={pill}>
                        <Text style={styles.priority}>{textPriority}</Text>
                    </View>
                    
                    <View style={styles.iconBox} >
                        <TouchableWithoutFeedback onPress={handleDeleteTask}>
                            <Ionicons name="trash-outline"  size={23} style={styles.icon} /> 
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </>
    
    )
}


const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 8,
        marginLeft: 10,
        marginRight: 15,
    },
    spacing: {
        padding: 10,
    },
    pill: {
        borderRadius: 20,
        margin: 10
    },
    title: {
        color: "black",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: 'center'
    },
    priority: {
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    hour: {
        fontSize: 13,
        fontWeight: "bold",
        color: "black",
        textAlign: 'right'
    },
    iconBox: {
        position: 'absolute',
        padding: 10,
        right: 0
    },
    icon:{
        color: 'red',
    }
});