import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react';
//import * as Progress from 'react-native-progress';

export default function ToDoProgressCard() {
    const [count, setCount] = useState(0.45);
    

    return (
        <View style={styles.container}>
            <Text>TITULO</Text>
            <Text>Description</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 50
    }
})

