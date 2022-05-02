import {View, StyleSheet, Text, TouchableWithoutFeedback, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import React, {useState, useEffect} from 'react';
import { deleteTask } from "../../../api";

export default function ToDoTaskCard(props) {
    const { task, loadTasks } = props;
    const {date} = task;

    const [textPriority, setTextPriority] = useState('')
    const [colorPriority, setColorPriority] = useState('')

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
                },
                {
                    text: "No",
                },
            ]
        );
    }
    
    const pill = { backgroundColor: colorPriority, ...styles.pill };
    
    const setCardPriority = () => {
        switch (task.priority) {
            case 0:
                setTextPriority('Prioridad baja')
                setColorPriority(['green'])
                break;
            case 1:
                setTextPriority('Prioridad media')
                setColorPriority('#24BDBD')
                break;
            case 2:
                setTextPriority('Prioridad alta')
                setColorPriority('yellow')
                break;
            case 3:
                setTextPriority('Urgente')
                setColorPriority('red')
                break;
        }
    }

    return (
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
        shadowRadius: 10,
        elevation: 10,
    },
    spacing: {
        padding: 10,
    },
    title: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center'
    },
    pill: {
        borderRadius: 20,
        margin: 10
    },
    priority: {
        fontSize: 12,
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