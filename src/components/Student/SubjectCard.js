import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

export default function SubjectCard() {
    return (
        <ImageBackground source={require('../../../assets/sea.jpg')} style={styles.background}> 
            <View styles={styles.container}>
                <Text>SubjectCard</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        width: '100%',
        height: '100%'
    },
    container: {
        height: '8%',
        width: '100%',
        margin: '3%'
    }
})