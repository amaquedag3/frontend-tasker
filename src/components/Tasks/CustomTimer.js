import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import * as Progress from 'react-native-progress';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTimer(props) {
    const {selectedTask, setSelectedTask} = props;
    const [play, setPlay] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerHours = hours < 10 ? `0${hours}` : hours

    useEffect(() => {
        if(play){
            let interval = setInterval(() => {
            clearInterval(interval);
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
            }, 1000)
        }
    }, [seconds, play])

    const handlePlay = () => {
        setPlay(!play)
    }

    const handleEnd = () => {
        
    }
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9844a', '#f9c74f', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1' ]


    return (
        <>
        
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>{selectedTask.title}</Text>
            <Text style={styles.timer}>{timerHours}:{timerMinutes}:{timerSeconds}</Text>
            <View style={{position: 'absolute'}}>
            {play ?
                <Progress.CircleSnail
                thickness={10}
                duration={1200}
                spinDuration={4000}
                animated= 'true' 
                size={280} 
                color={colors} 
                />
                :
                <Progress.Circle
                size={280}
                borderWidth={10}/>
            }
            </View>
            {play ? 
                <>
                <View style={{flexDirection: 'row'}}>
                    <TouchableWithoutFeedback onPress={handlePlay}>
                        <Ionicons name='ios-pause-circle-outline' size={60} color={'#fdc500'}/>
                    </TouchableWithoutFeedback> 
                    <TouchableWithoutFeedback onPress={handleEnd}>
                        <Ionicons name='ios-stop-circle-outline' size={60} color={'#f94144'}/>
                    </TouchableWithoutFeedback> 
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
                        <TouchableWithoutFeedback onPress={() => {setSelectedTask(undefined)}}>
                    <Ionicons name='arrow-up-circle-outline' size={60} color={'#f94144'}/>
                    </TouchableWithoutFeedback> 
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