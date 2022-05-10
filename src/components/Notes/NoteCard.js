import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react'
import { useHandler } from 'react-native-reanimated';

export default function NoteCard(props) {
    const {reminder} = props;
    const [isActive, setActive] = useState(reminder.activado);
    const [content, setContent] = useState(reminder.content);
    const [hour, setHours] = useState(reminder.hour)

    const handleChangeAlarm = () => {
        console.log('change', isActive)
        setActive(!isActive)
        reminder.activado = isActive
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleChangeAlarm}>
                <View style={styles.icon}>
                    {reminder.activado ? 
                    <Ionicons name='alarm-outline' size={25} color='green'/> : 
                    <Ionicons name='alarm-outline' size={25}/>
                    }
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>{reminder.content}</Text>
            {reminder.activado ?
            <Text>{reminder.hour}</Text>
            : <Text></Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 8,
        margin: 8,
        borderRadius: 10
    },
    icon: {
        alignSelf: 'flex-end',
        position: 'absolute',
        marginTop: '5%',
        marginLeft: '5%'
    },
    text: {
        marginRight: '20%'
    }
})