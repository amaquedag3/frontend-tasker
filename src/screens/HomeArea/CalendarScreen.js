import { View, ImageBackground, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


export default function CalendarScreen() {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  return ( 
    <Agenda 
    markingType={'multi-dot'}
    markedDates={{
      '2022-05-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
      '2022-05-26': {dots: [massage, workout], disabled: true}
    }}
    />
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
