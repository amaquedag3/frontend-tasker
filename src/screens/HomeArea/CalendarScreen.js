import { View, ImageBackground, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


export default function CalendarScreen() {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  return ( 
    <>
      <Agenda 
        selected={'2022-05-16'}
        items={{
        '2022-05-22': [{ name: 'item 1 - any js object' }],
        '2022-05-23': [{ name: 'item 2 - any js object', height: 80 }],
        '2022-05-24': [],
        '2022-05-25': [{ name: 'item 3 - any js object' }], 
        }} />

      
    </>
  )
  
}


const styles = StyleSheet.create({
  background:{
    width: '100%',
    marginBottom: 0
  },
  calendarContainer:{
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 30,
    paddingTop: 5,
    paddingBottom: 20,
  }
});
