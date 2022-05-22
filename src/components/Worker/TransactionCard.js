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
            <View style={styles.textContainer}>
                <Text style={styles.text}>{transaction.motivo}</Text>
                <Text style={styles.text}>Importe: {transaction.importe}€</Text>
            </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        margin: 5,
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 0.8
    },
    textContainer:{
        width: '80%'
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    iconBox: {
        position: 'absolute',
        paddingRight: 8,
        right: 0
    },
    icon:{
        color: 'red',
    }
})