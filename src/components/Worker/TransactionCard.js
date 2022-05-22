import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteTransaction } from '../../../api';

export default function TransactionCard(props) {    
    const {transaction, getUserTransactions} = props;

    function handleDeleteSubject(){
        return Alert.alert(
            "Eliminando Transacción...",
            "¿Estas seguro de que quieres eliminar esta transacción?",
            [
                {
                    text: "Sí",
                    onPress: async () => { 
                        await deleteTransaction(transaction.id)
                        await getUserTransactions()
                    },
                },{text: "No"},
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text>{transaction.motivo}</Text>
            <Text>{transaction.importe}€</Text>
            <View style={styles.iconBox} >
                <TouchableWithoutFeedback onPress={handleDeleteSubject}>
                    <Ionicons name="trash-outline"  size={23} style={styles.icon} /> 
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        margin: 5,
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center'
    },
    iconBox: {
        position: 'absolute',
        paddingRight: 10,
        paddingTop: 5,
        right: 0
    },
    icon:{
        color: 'red',
    }
})