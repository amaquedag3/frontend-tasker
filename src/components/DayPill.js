import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import { find } from 'lodash';

export default function DayPill(props) {
    const {day, setSelectedDay}  = props;
    const [isSelected, setSelected] = useState(false)
    const [bgColor, setBgColor] = useState('gray')

    const pill = { backgroundColor: bgColor, ...styles.pill };

    useEffect(()=> {
        if(isSelected){
            setSelectedDay(day.id)
            setBgColor('blue')
        }else{
            setSelectedDay()
            setBgColor('gray')
        }
    }, [isSelected])
    

    return (
        <TouchableWithoutFeedback onPress={() => setSelected(!isSelected)}>
            <View style={pill}>
                <Text style={styles.content}>{day.value}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    pill:{
        width:38, 
        height: 38, 
        borderRadius: 20, 
        justifyContent:'center',
        margin: 1,
    },
    content:{
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})