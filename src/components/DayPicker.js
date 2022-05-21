import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import DayPill from './DayPill';
import CustomTimePicker from './CustomTimePicker';


export default function DayPicker() {
    const days = [{id: 0, value: 'L'},{id: 1, value: 'M'},{id: 2, value: 'X'},{id: 3, value: 'J'},{id: 5, value: 'S'},{id: 6, value: 'D'}]
    const [selectedDay, setSelectedDay] = useState()

    let schedule = []

    useEffect(() => {
        console.log(schedule[selectedDay])

    }, [selectedDay])

    useEffect(() => {
        days.forEach(day => {
            schedule.push({
                id: day.id,
                time: '',
                duration: ''
            })
            
        });
    }, [])
    
    

    return (
        <View>
            <SafeAreaView >
                <View style={styles.container}>
                    <FlatList
                            data={days}
                            renderItem={({ item }) => 
                                <DayPill
                                    day={item} 
                                    setSelectedDay={setSelectedDay}
                                    />
                            }
                            keyExtractor={(item, index) => {return index.toString()}}
                            horizontal={true}

                        />
                </View>
            </SafeAreaView>
            <CustomTimePicker inputDate={new Date(0)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
})