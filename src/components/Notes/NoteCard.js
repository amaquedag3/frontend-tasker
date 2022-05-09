import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

export default function NoteCard(props) {
    const {reminder} = props;
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Ionicons name='alarm-outline' size={25}/>
            </View>
        
            <Text>{reminder.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 8,
        margin: 8,
        borderRadius: 10
    },
    icon: {
        alignSelf: 'flex-end',
        position: 'absolute'
    },
    text: {

    }
})