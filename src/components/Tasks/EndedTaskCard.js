import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteTask, getPhaseById, getProjectById } from '../../../api';

export default function EndedTaskCard(props) {
    const {task, loadTasks} = props;
    const [projectName, setProjectName] = useState();
    const [phaseName, setPhaseName] = useState()

    const handleDeleteTask = () => {
        return Alert.alert(
            "Elimnando tarea...",
            "¿Estas seguro de que quieres eliminar esta tarea?",
            [
                {
                    text: "Sí",
                    onPress: async () => { 
                        await deleteTask(task.id)
                        await loadTasks()
                    },
                },{text: "No"},
            ]
        );
    }

    const setProjectNameByPhaseId =async() => {
        let phase = await getPhaseById(task.idPhase)
        let project = await getProjectById(phase[0].idProject)
        setPhaseName(phase[0].title)
        setProjectName(project[0].title)
    }

    useEffect( () => {
        if(task.idPhase)
            setProjectNameByPhaseId()
        
    }, [])
    
    

    return (
        
            <View style={styles.card}>
                <View style={styles.spacing}>
                    <Text style={styles.title}>{task.title}</Text>
                    <Text style={styles.subTitle}>Duracion: <Text style={styles.content}>{task.duration} minutos</Text></Text>
                    <Text style={styles.subTitle}>Duracion esperada: <Text style={styles.content}>{task.expectedDuration} minutos</Text></Text>
                    <Text style={styles.subTitle}>Fecha: <Text style={styles.content}>{task.date.split('T')[0]}</Text></Text>
                    <Text style={styles.subTitle}>Acabada: <Text style={styles.content}>{task.finished.split('T')[0]}</Text></Text>
                    {
                        task.idPhase
                        ? <Text style={styles.subTitle}>Proyecto: <Text style={styles.content}>{ projectName } - {phaseName} </Text></Text>
                        : <View/>
                    }
                </View>
                <TouchableWithoutFeedback onPress={handleDeleteTask}>
                    <Ionicons name="trash-outline"  size={32} style={styles.icon} />
                </TouchableWithoutFeedback>
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 6,
        borderRadius: 20,
        paddingBottom: 15
    },
    spacing: {
        paddingHorizontal: 10,
    },
    title: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 10,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 14,
    },
    content: {
        color: "black",
        fontWeight: "normal",
        fontSize: 14,
    },
    icon: {
        color: 'red',
        position: 'absolute',
        right: 0,
        paddingHorizontal: 10,
        marginTop: 40
    }
});