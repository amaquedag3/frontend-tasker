import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function PhaseItem(props) {
    const {phase} = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{phase.title}</Text>
            <Text>{phase.started}</Text>
            <Text>{phase.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        
    },
    title: {
        fontWeight: 'bold',
        
    }
})