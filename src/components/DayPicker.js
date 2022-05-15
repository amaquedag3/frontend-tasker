import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import DayPill from './DayPill'

export default function DayPicker() {
    const days = [
        {id: 0, value: 'L'},
        {id: 1, value: 'M'},
        {id: 2, value: 'X'},
        {id: 3, value: 'J'},
        {id: 4, value: 'V'},
        {id: 5, value: 'S'},
        {id: 6, value: 'D'}
    ]

    return (
        <View>
            <SafeAreaView >
                <View style={styles.container}>
                    <FlatList
                            data={days}
                            renderItem={({ item }) => <DayPill day={item}/>}
                            keyExtractor={(item, index) => {return index.toString()}}
                            horizontal={true}

                        />
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
})