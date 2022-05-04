import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ToDoProgress(props) {
  

  return (
    <View style={style.container}>
      <Text></Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    height: '40%',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  }
});