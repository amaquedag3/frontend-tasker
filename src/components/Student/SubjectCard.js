import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { deleteSubject } from '../../../api';


export default function SubjectCard(props) {
    const {subject, loadSubjects} = props;
    const navigation = useNavigation();

    function handleDeleteSubject(){
        return Alert.alert(
            "Eliminando Asignatura...",
            "¿Estas seguro de que quieres eliminar esta asignatura?",
            [
                {
                    text: "Sí",
                    onPress: async () => { 
                        await deleteSubject(subject.id)
                        await loadSubjects()
                    },
                },{text: "No"},
            ]
        );
    }

    return (
        <TouchableWithoutFeedback onPress={()=>navigation.navigate("SubjectDetails", {subject})}>
            <View style={styles.card}>
            
                <Text style={styles.title}>{subject.nombre}</Text>
                <View style={styles.iconBox} >
                    <TouchableWithoutFeedback onPress={handleDeleteSubject}>
                        <Ionicons name="trash-outline"  size={23} style={styles.icon} /> 
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '8%',
        width: '100%',
        margin: '3%'
    },
    card: {
        width: '90%',
        padding: '3%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        alignSelf: 'center',
        marginHorizontal: 10,
        marginTop: 4
    },
    title:{
        fontWeight: 'bold',
        textAlign: 'center'
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