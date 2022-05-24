import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import * as Progress from 'react-native-progress';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { orderBy } from "lodash";
import { updateTask } from '../../../api';

export default function CustomTimer(props) {
    const {loadTasks, selectedTask, setSelectedTask, isPlaying, setPlay, duration, setDuration} = props;
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);;

    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerHours = hours < 10 ? `0${hours}` : hours

    useEffect(() => {
        if(isPlaying){
            let interval = setInterval(() => {
                clearInterval(interval);
                setDuration(hours * 60 + minutes)
                if(seconds !== 59){
                    setSeconds(seconds + 1)
                }else{
                    setSeconds(0)
                if(minutes !== 59){
                    setMinutes(minutes + 1)
                }else {
                    setMinutes(0)
                    setHours(hours + 1)
                }
                }
            }, 0.01)
        }
    }, [seconds, isPlaying])

    const handlePlay = () => {
        setPlay(true)
    }

    const handleSwitch = () => {
        setDuration(0)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setSelectedTask()
        loadTasks()
    }

    const handleSave = () => {
        selectedTask.finished = new Date()
        selectedTask.duration = duration
        setPlay(false)
        updateTask(selectedTask)
        setSelectedTask(undefined)
        setDuration(0)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
    }

    const handleEnd = () => {
        console.log('Fin de tarea')
        return Alert.alert(
            selectedTask.title,
            "¿Dar por finalizada la tarea?",
            [
                {
                    text: "Sí",
                    onPress: handleSave
                },
                {
                    text: "No",
                },
            ]
        );
    }

    const handlePause = () => {
        setPlay(false)
    }
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1' ]


    return (
        <>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.timer}>{timerHours}:{timerMinutes}:{timerSeconds}</Text>
            <View style={{position: 'absolute'}}>
            {isPlaying ?
                <Progress.CircleSnail
                thickness={10}
                duration={1200}
                spinDuration={4000}
                animated= 'true' 
                size={240} 
                color={colors} 
                />
                :
                <Progress.Circle
                size={240}
                borderWidth={10}/>
            }
            </View>
            <View style={{ width: '50%'}}>
                <Text>{selectedTask.title}</Text>
            </View>
            
            {isPlaying ? 
                <>
                <View style={{flexDirection: 'row'}}>
                    <TouchableWithoutFeedback onPress={handlePause}>
                        <Ionicons name='ios-pause-circle-outline' size={60} color={'#fdc500'}/>
                    </TouchableWithoutFeedback>
                    {duration >= 5 ?
                    <TouchableWithoutFeedback onPress={handleEnd}>
                        <Ionicons name='ios-stop-circle-outline' size={60} color={'#f94144'}/>
                    </TouchableWithoutFeedback>
                    : <Text/>
                    } 
                </View>
                <View>
                    <Image style={styles.image} source={require('../../../assets/pikachu.gif')} />
                </View>
                </>
                :
                <>
                <View style={{flexDirection: 'row'}}>
                    <TouchableWithoutFeedback onPress={handlePlay}>
                        <Ionicons name='ios-play-circle-outline' size={60} color={'#90be6d'}/>
                    </TouchableWithoutFeedback> 
                    {duration >= 5 ?
                    <TouchableWithoutFeedback onPress={handleEnd}>
                        <Ionicons name='ios-stop-circle-outline' size={60} color={'#f94144'}/>
                    </TouchableWithoutFeedback> 
                    : 
                    <TouchableWithoutFeedback onPress={handleSwitch}>
                        <Ionicons name='arrow-up-circle-outline' size={60} color={'#f94144'}/>
                    </TouchableWithoutFeedback> 
                    }
                </View>

                <View>
                    <Image style={styles.image} source={require('../../../assets/pikachu.jpg')} />
                </View>
                </>
                }
        </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    timer: {
        fontSize: 25,
        fontFamily: 'Roboto'
    },
    image: {
        bottom: 0,
        width: 80,
        height: 60,
    }
});