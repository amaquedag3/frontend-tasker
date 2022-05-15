import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteTask } from '../../../api';

export default function EndedTaskCard(props) {
    const {task, loadTasks} = props;

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

    return (
        
            <View style={styles.card}>
                <View style={styles.spacing}>
                    <Text style={styles.title}>{task.title}</Text>
                    <Text>Duracion: {task.duration}</Text>
                    <Text>Duracion esperada: {task.expectedDuration}</Text>
                    <Text>Fecha: {task.date.split('T')[0]}</Text>
                    <Text>Acabada: {task.finished.split('T')[0]}</Text>
                    {
                        task.idPhase
                        ? <Text>Proyecto: {task.idPhase}</Text>
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
        fontSize: 15,
        paddingTop: 10,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'red',
        position: 'absolute',
        right: 0,
        paddingHorizontal: 10,
        marginTop: 40
    }
});