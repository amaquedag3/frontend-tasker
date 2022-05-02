import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React, { useState } from 'react';


export default function ChangerButton() {

    const states = ['Hoy', 'Mañana', 'Semana', 'Mes']
    const [state, setState] = useState(states[0]);
    const onPress = () => {
        let index = states.indexOf(state) + 1
        if(index == 4)
            index = 0
        setState(states[index])
    }



    return (
        <View>
            <TouchableHighlight
                onPress={onPress}
                style={styles.btnContainer}>
            <View >
                <Text style={styles.btnText}>{state}</Text>
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