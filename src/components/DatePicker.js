import React, { useState } from 'react'
import { View, Button,TouchableWithoutFeedback, Image } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'

export default function CustomDatePicker(props) {
    const {setDate} =  props;
    const [showDatePicker, setShowDatePicker] = useState(false)

    const openDatePicker = () => {
        setShowDatePicker(true)
    }
    
    const onCancel = () => {
        // You should close the modal in here
        setShowDatePicker(false)
    }
    
    const onConfirm = ( date ) => {
        // You should close the modal in here
        setDate(String(date.dateString))
        setShowDatePicker(false)
        // The parameter 'date' is a Date object so that you can use any Date prototype method.
    }

    return (
        <View style={{alignSelf:'center', paddingRight: 10}}>
            <TouchableWithoutFeedback onPress={openDatePicker}>
                <Image
                    source={require('../../assets/calendar.png')}
                    style={{ width: 30, height: 30 }}/>
            </TouchableWithoutFeedback>
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        </View>
    )
}