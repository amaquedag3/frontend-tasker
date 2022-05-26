import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import Slider from '@react-native-community/slider';

export default function CustomSliderDuration(props) {
    const {setDuration} = props

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    
    useEffect(() => {
        setDuration(60 * hours + minutes)
    }, [hours, minutes])
    
    return (
    <View>
        <Text style={styles.sliderTitle}>Duración</Text>

        <View style={styles.container}>
            <Text style={styles.sliderLabel}>{hours} Horas</Text>
            <Slider
                style={{width: '90%', height: 30, alignSelf: 'center'}}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="black"
                maximumTrackTintColor="#000000"
                step={1}
                onValueChange={(value)=>{setHours(value)}}
            />
            <Text style={styles.sliderLabel}>{minutes} Minutos</Text>
            <Slider
                style={{width: '90%', height: 30, alignSelf: 'center'}}
                minimumValue={0}
                maximumValue={59}
                minimumTrackTintColor="black"
                maximumTrackTintColor="#000000"
                step={1}
                onValueChange={(value)=>{setMinutes(value)}}
            />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 0.8,
        marginHorizontal: 20, 
        borderRadius: 15
    },
    sliderTitle:{
        alignSelf: 'center',
        fontSize: 16
    },
    sliderLabel:{
        marginTop:'2%',
        marginLeft: '15%'
    }
})