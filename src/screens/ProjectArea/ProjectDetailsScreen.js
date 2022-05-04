import { View, Text, ImageBackground, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getPhasesByProjectId } from '../../../api';
import { FlatList } from 'react-native-gesture-handler';
import ButtonAdd from '../../components/ButtonAdd';
import PhaseItem from '../../components/Projects/PhaseItem';

export default function ProjectDetailsScreen(props) {
    const {route} = props;
    const {params} = route;
    const {project} = params;

    const navigation = useNavigation();
    const [phases, setPhases] = useState()
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(async() =>{
        setRefreshing(true)
        await getPhases();
        setRefreshing(false);
    })


    const getPhases = async() => {
        const result = await getPhasesByProjectId(project.id)
        if(result)
            setPhases(result)
    }

    useEffect(()=> {
        getPhases()
    }, [])
    

    return (
        <ImageBackground source={require('../../../assets/night-landscape.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>{project.title}</Text>
                <Text style={styles.subTitle}>Descripción: </Text>
                <Text>{project.description}</Text>
                <Text style={styles.subTitle}>Fecha de Inicio: </Text>
                <Text>{project.started.split('T')[0]}</Text>
                <Text style={styles.subTitle}>Fases creadas: </Text>
                <View style={styles.list}>
                    <FlatList 
                        data={phases}
                        renderItem={({ item }) => <PhaseItem phase={item}/> }
                        keyExtractor={(item, index) => {return index.toString()}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}/>
                        }
                    />
                </View>
                <View style={styles.button}>
                    <ButtonAdd size={50} action={() => {navigation.navigate('PhaseForm', {project})}}/>
                </View>
            </View>
            
        </ImageBackground>
    )
}

const styles =  StyleSheet.create({
    background:{
        width: '100%',
        height: '100%'
    },
    container: {
        padding: 20,
        marginVertical: 80,
        height: '80%',
        marginHorizontal: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
    subTitle: {
        paddingTop: 15,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
    list: {
        paddingHorizontal: 10,
        marginTop: 10,
        height: '50%',
        borderWidth: 0.4,
        borderRadius: 20
    },

    button: {
        position: 'absolute',
        bottom: 0, 
        alignSelf: 'center',
        
    }
})