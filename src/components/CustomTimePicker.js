
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Image } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function CustomTimePicker() {
    const [date, setDate] = useState(new Date().toLocaleTimeString('default', {hour: '2-digit',minute: '2-digit'}));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    placeholder="Hora"
                    style={styles.inputDate}
                    autoCapitalize="none"
                    editable={false}>   
                    {String(date).slice(0, -3)}                             
                </TextInput>
                <View style={styles.icon}>
                    <TouchableWithoutFeedback  onPress={showTimepicker}>
                        <Image
                            source={require('../../assets/clock.png')}
                            style={{ width: 38, height: 38 }}/>
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
        </>
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
        height: 40,
        width: 100,
        borderWidth: 1,
        textAlign: 'center',
        marginHorizontal: 12,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent:'center',
        color: 'black',
        fontSize: 16,
    },
})
