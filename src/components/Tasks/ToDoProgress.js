import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ToDoProgressCard from './ToDoProgressCard';

export default function ToDoProgress() {
  return (
    <View style={style.container}>
      <ToDoProgressCard/>
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