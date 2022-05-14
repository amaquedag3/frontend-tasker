import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

export default function EndedTasksScreen() {
    return (
        <ImageBackground  source={require('../../../assets/moon.jpg')} style={styles.background}>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%'
    }
})