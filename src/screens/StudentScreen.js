import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

export default function StudentScreen() {
  return (
    <ImageBackground source={require('../../assets/moon.jpg')} style={styles.background}> 

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  }
})