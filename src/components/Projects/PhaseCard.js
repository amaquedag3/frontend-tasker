import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { deletePhase, updatePhase, getTasksByPhaseId } from '../../../api';
import CustomModal from '../CustomModal';
import { wait } from '../../utils/wait';

export default function PhaseCard(props) {
    const {phase, getPhases, project} = props;
    const [modalVisible, setModalVisible] = useState("");
    const [modalText, setModalText] = useState("");
    const [time, setTime] = useState(0)

    const navigation = useNavigation();
    

    const setFinished = async() => {
        phase.finished = new Date()
        await updatePhase(phase)
        await getPhases()
    }

    useEffect(async() => {
        const data = await getTasksByPhaseId(phase.id)
        if(data){
            setTime(0)
            data.forEach(task => {
                setTime(time + task.duration)
            });
        }
    }, [])
    

    const handleDelete = async() => {
        await deletePhase(phase.id)
        setModalText('Fase borrada.')
        setModalVisible(true)
        await wait(1200)
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
                <Text style={styles.subtitle}>Tiempo dedicado: <Text style={{fontWeight:'normal'}}>{time} minutos</Text></Text>
                <View style={styles.iconBox}>
                    {phase.finished ? <Text style={styles.dateEnd}>Acabado: <Text style={{fontWeight: 'normal'}}>{phase.finished.split('T')[0]}</Text></Text> : <Text style={styles.dateEnd}>Por hacer</Text>}
                    {phase.finished 
                        ? <Ionicons name="checkmark-circle-outline"  size={23} style={styles.icon} color='gray'/> 
                        : <Ionicons onPress={setFinished} name="checkmark-circle-outline"  size={23} style={styles.icon} color='green'/> 
                    }
                    <Ionicons onPress={() => navigation.navigate('PhaseForm', {phase: phase, project: project})} name="pencil"  size={23} style={styles.icon} color='#FFBD33'/> 
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
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 13.5,
        marginTop: 8
    },
    date: {
        fontWeight: 'normal',
    },
    dateEnd: {
        marginRight: 'auto',
        alignSelf: 'center',
        fontWeight: 'bold'
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