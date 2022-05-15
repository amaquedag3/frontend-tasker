import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'

export default function DayPill(props) {
    const {day} = props;
    const [isSelect, setSelected] = useState(false)
    const [bgColor, setBgColor] = useState('gray')

    const pill = { backgroundColor: bgColor, ...styles.pill };

    useEffect(()=> {
        if(isSelect)
            setBgColor('blue')
        else
            setBgColor('gray')
    }, [isSelect])

    return (
        <TouchableWithoutFeedback onPress={() => {setSelected(!isSelect)}}>
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
        textAlign: 'center'
    }
})