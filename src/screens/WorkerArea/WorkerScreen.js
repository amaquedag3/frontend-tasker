import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

export default function WorkerScreen() {
  return (
    <ImageBackground source={require('../../../assets/desktop.jpg')} style={styles.background}> 
      <View style={styles.container}>
        <Text style={styles.title}>Gastos e Ingresos</Text>
      </View>
    </ImageBackground>
  )
}



const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  container:{
    paddingHorizontal: '5%',
    height: '88%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginVertical: '12%',
    marginHorizontal: '8%',
    borderRadius: 20
  },
  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10
  },

})