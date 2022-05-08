import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { deletePhase, updatePhase } from '../../../api';
import CustomModal from '../CustomModal';

export default function PhaseItem(props) {
    const {phase, getPhases, project} = props;

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");

    const setFinished = async() => {
        phase.finished = new Date()
        console.log(phase)
        await updatePhase(phase)
        await getPhases()
    }

    const handleEdit = async() => {
        navigation.navigate('PhaseForm', {phase: phase, project: project})
    }

    const handleDelete = async() => {
        await deletePhase(phase.id)
        setModalText('Fase borrada.')
        setModalVisible(true)
        await getPhases()
    }

    return (
        <>
            <CustomModal 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    modalText={modalText}
                    setModalText={setModalText}/>
            <View style={styles.container}>
                <Text style={styles.title}>{phase.title}  <Text style={styles.date}>{phase.started.split('T')[0]}</Text></Text>
                <Text>{phase.description}</Text>
                <View style={styles.iconBox}>
                    {phase.finished ? <Text style={styles.dateEnd}>Acabado: {phase.finished.split('T')[0]}</Text> : <Text style={styles.dateEnd}>Por hacer</Text>}
                    <Ionicons onPress={setFinished} name="checkmark-circle-outline"  size={23} style={styles.icon} color='green'/> 
                    <Ionicons onPress={handleEdit} name="pencil"  size={23} style={styles.icon} color='#FFBD33'/> 
                    <Ionicons onPress={handleDelete} name="trash-outline"  size={23} style={styles.icon} color='red' /> 
                </View>
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8
    },
    date: {
        fontWeight: 'normal',
    },
    dateEnd: {
        marginRight: 'auto',
        alignSelf: 'center'
    },
    iconBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    icon:{
        padding: 5
    }

})