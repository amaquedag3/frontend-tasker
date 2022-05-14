import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, {useEffect, useState} from 'react'

export default function NoteCard(props) {
    const {reminder} = props;
    const [isActive, setActive] = useState(reminder.activado);
    const [content, setContent] = useState(reminder.content);
    const [hour, setHours] = useState(reminder.hour)

    const handleChangeAlarm = () => { 
        console.log('pressed')
        setActive(!isActive)
        reminder.activado = isActive
    }

    useEffect(()=> {
        
    }, [])

    return (
        <View style={styles.container}>

            
            
                <TouchableWithoutFeedback onPress={handleChangeAlarm}>
                    <View style={styles.icon}>
                        {reminder.activado ? 
                        <Ionicons name='alarm-outline' size={37} color='green'/> : 
                        <Ionicons name='alarm-outline' size={37} color='gray'/>
                        }
                    </View>
                </TouchableWithoutFeedback>
            
            <Text style={styles.content}>{reminder.content}</Text>

            {reminder.activado ? 
            <Text style={{fontWeight: 'bold'}}>{reminder.hour}</Text> :
            <Text style={{fontWeight: 'normal'}}>{reminder.hour}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 7,
        margin: 7,
        borderRadius: 10
    },
    icon: {
        alignSelf: 'flex-end',
        position: 'absolute',
        padding: 12,
    },
    content: {
        marginRight: '20%'
    }
})