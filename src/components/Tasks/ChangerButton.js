import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';


export default function ChangerButton(props) {
    const states = ['Hoy', 'Mañana', 'Semana', 'Mes']
    const {range, setRange} = props;
    const [selection, setSelection] = useState(0)

    const changeSelection = () => {
        if(selection === 3){
            setSelection(0)
        }else{
            setSelection(selection + 1)
        }
        setRange(states[selection])
    }

    return (
        <View>
            <TouchableHighlight
                onPress={changeSelection}
                style={styles.btnContainer}>
            <View >
                <Text style={styles.btnText}>{states[selection]}</Text>
            </View>
            </TouchableHighlight>  
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        marginHorizontal: 150,
        marginTop: 20,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4A5043',
        elevation: 10,
        backgroundColor: "#CFBAF0"
    },
    btnText: {
        color: 'black',
        textAlign: 'center',
    }
});