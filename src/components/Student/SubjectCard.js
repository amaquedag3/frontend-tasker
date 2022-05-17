import { View, Text } from 'react-native'
import React from 'react'

export default function SubjectCard() {
    return (
        <View styles={styles.container}>
            <Text>SubjectCard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '8%',
        width: '100%',
        margin: '3%'
    }
})