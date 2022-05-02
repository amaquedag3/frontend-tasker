import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function ButtonAdd(props) {
    const {action} = props;

    return (
        <TouchableWithoutFeedback onPress={action}>
            <View style={styles.container}>
                <Image source={require('../../assets/add.png')} style={styles.image}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        padding: 20,
    },
    image: {
        width: 80, 
        height: 80,
        alignSelf: 'center'
    }
})