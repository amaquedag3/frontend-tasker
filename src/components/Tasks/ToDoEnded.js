import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ToDoEnded() {
    return (
        <View style={style.container}>
            <Text>TO DO ENDED</Text>
        </View>
    )
}
    
const style = StyleSheet.create({
    container: {
        height: '18%',
        backgroundColor: '#B9FBC0',
        borderRadius: 10,
        margin: 10,
    }
});