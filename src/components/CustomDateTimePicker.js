
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Image } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function CustomDateTimePicker(props) {
    const {inputDate, setInputDate} = props;
    const [date, setDate] = useState(new Date(inputDate));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false);
        setInputDate(selectedDate)
        setDate(selectedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Fecha"
                    style={styles.inputDate}
                    autoCapitalize="none"
                    editable={false}>   
                    {String(inputDate).split('GMT')[0]}                             
                </TextInput>
                <View style={styles.icon}>
                    <TouchableWithoutFeedback  onPress={showDatepicker}>
                        <Image
                            source={require('../../assets/calendar.png')}
                            style={{ width: 35, height: 35 }}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.icon}>
                    <TouchableWithoutFeedback  onPress={showTimepicker}>
                        <Image
                            source={require('../../assets/clock.png')}
                            style={{ width: 35, height: 35 }}/>
                    </TouchableWithoutFeedback>
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    />
                )}
            </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignSelf:'center',
        marginVertical: 10,
    },
    icon: {
        justifyContent: 'center',
        paddingLeft: 10
    },
    inputDate: {
        height: 35,
        borderWidth: 1,
        textAlign: 'center',
        width: '60%',
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent:'center',
        color: 'black',
        fontSize: 13,
    },
})
