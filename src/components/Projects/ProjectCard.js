import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { capitalize } from "lodash";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteProject } from '../../../api';

export default function ProjectCard(props) {
    const {project, loadProjects} = props;
    const navigation = useNavigation();

    const goToProject = () => {
        navigation.navigate("ProjectDetails", { project });
    };


    const handleDeleteProject = () => {
        return Alert.alert(
            "Eliminando proyecto...",
            "¿Estas seguro de que quieres eliminar este Proyecto?",
            [
                {
                    text: "Sí",
                    onPress: async () => { 
                        console.log('Eliminando proyecto ...', project.id)
                        await deleteProject(project.id)
                        await loadProjects()
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }


    return (
        <TouchableWithoutFeedback onPress={goToProject}>
            <View style={styles.card}>
                <View style={styles.spacing}>
                    <View style={styles.bgStyles}>
                        <Text style={styles.title}>{capitalize(project.title)} </Text>
                        <TouchableWithoutFeedback onPress={handleDeleteProject}>
                            <Ionicons name="trash-outline"  size={25} style={styles.icon} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}




const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 80,
    },
    spacing: {
        flex: 1,
        padding: 5,
    },
    bgStyles: {
        flex: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    title: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
        paddingTop: 10,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'red',
        position: 'absolute',
        right: 0,
        paddingHorizontal: 40,
        paddingVertical:20
    }
});