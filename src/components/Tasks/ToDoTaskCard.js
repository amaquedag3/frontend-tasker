import {View, StyleSheet, Text } from "react-native";

import React from 'react';

export default function ToDoTaskCard(props) {
    const { task } = props;
    const {date} = task;
    
    return (
        
        <View 
            style={styles.card}>
            <View style={styles.spacing}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.hour}> {date.split('T')[1].slice(0, 5)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 100,
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
    },
    hour: {
        fontSize: 13,
        fontWeight: "bold",
        color: "black",
    }
});