import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Progress from 'react-native-progress';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function ToDoProgress(props) {
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
      <View style={styles.container}>
          <Text>TITULO</Text>
          <Text style={styles.timer}>{timerHours}:{timerMinutes}:{timerSeconds}</Text>
          <View style={{position: 'absolute'}}>
          {play ?
            <Progress.CircleSnail
              thickness={10}
              duration={1200}
              spinDuration={8000}
              animated= 'true' 
              size={250} 
              color={colors} 
            />
            :
            <Progress.Circle
              size={250}
              borderWidth={10}/>
          }
          </View>
          {play ? 
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={handlePlay}>
                  <Ionicons name='ios-pause-circle-outline' size={60} color={'#fdc500'}/>
                </TouchableWithoutFeedback> 
                <TouchableWithoutFeedback onPress={handleEnd}>
                  <Ionicons name='ios-stop-circle-outline' size={60} color={'#f94144'}/>
                </TouchableWithoutFeedback> 
              </View>
              :
              <TouchableWithoutFeedback onPress={handlePlay}>
                <Ionicons name='ios-play-circle-outline' size={60} color={'#90be6d'}/>
              </TouchableWithoutFeedback> 
            }
            
      </View>
  )

}

const styles = StyleSheet.create({
  container: {
    height: '40%',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timer: {
    fontSize: 25,
    fontFamily: 'Roboto'
  }
});