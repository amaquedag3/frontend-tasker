import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from 'react'

export default function NoteCard(props) {
    const {reminder} = props;
    const [isActive, setActive] = useState(reminder.activado);
    const [content, setContent] = useState();
    const [hour, setHour] = useState()

    const options = [
        {id: 1, title: 'Una vez'},
        {id: 2, title: 'De lunes a viernes'},
        {id: 3, title: 'Fin de semana'},
        {id: 4, title: 'Personalizado'}
    ]


    const navigation = useNavigation();

    const handleChangeAlarm = () => { 
        reminder.activado = !isActive
        setActive(reminder.activado)
    }

    useEffect(()=> {
        setActive(reminder.activado)
        setContent(reminder.content)
        setHour(reminder.hour)
    }, [reminder])


    return (
        <TouchableWithoutFeedback onPress={()=>{navigation.navigate('NoteForm', {reminder: reminder, options,})}}>
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
                    <View> 
                        <Text style={{fontWeight: 'bold', marginTop: 5}}>{reminder.date}</Text> 
                    </View>
                    :
                    <View>
                        <Text style={{fontWeight: 'normal', marginTop: 5}}>{reminder.date}</Text>
                    </View>
                
                }
                <Text>{options[reminder.periodicity - 1].title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        margin: 7,
        borderRadius: 10
    },
    icon: {
        alignSelf: 'flex-end',
        position: 'absolute',
        paddingVertical: 15,
        paddingRight: 10
    },
    content: {
        marginRight: '10%'
    }
})