import { View, Text, ImageBackground, StyleSheet, RefreshControl, TouchableWithoutFeedback , FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getPhasesByProjectId, getTasksByPhaseId, getProjectTime } from '../../../api';
import ButtonAdd from '../../components/ButtonAdd';
import PhaseCard from '../../components/Projects/PhaseCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Pantalla que carga los datos de un proyecto 
export default function ProjectDetailsScreen(props) {
    //Proyecto en cuestión
    const {project} = props.route.params;

    //Estados definidos en la vista
    const [phases, setPhases] = useState([])
    const [ended, setEnded] = useState(false)
    const [time, setTime] = useState(0)

    //Estados para recargar los datos
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    //Función que recarga las fases de la API cuando
    //Se añade o se elimina de una fase
    const onRefresh = React.useCallback(async() =>{
        setRefreshing(true)
        await getPhases();
        setRefreshing(false);
    })

    //Función que verifica que todas las fases estan acabadas
    function isEnded(){
        if(phases.length > 0){
            for (var i=0; i < phases.length; i++){
                if(phases[i].finished == null){
                    return false
                }
            }
        }else{
            return false
        }
        return true
    }
    

    //Función que obtiene las fases del proyecto de la API
    const getPhases = async() => {
        const result = await getPhasesByProjectId(project.id)
        if(result.length > 0){
            setPhases(result)
            if(isEnded()){
                setEnded(true)
            }
            computeTime()
        }
    }

    //Función que obtiene el tiempo total de proyecto
    const computeTime = async() => {
        try{
            const data = await getProjectTime(project.id)
            setTime(JSON.stringify(data).split('":"')[1].slice(0, -2))
            
        }catch(error){
            setTime(0)
        }
    }

    useEffect(async()=> {
        await getPhases()
    }, [])

    useEffect(async ()=> {
        if(isEnded()){
            setEnded(true)
        }
    }, [phases])


    return (
        <ImageBackground source={require('../../../assets/sun-flower.jpg')} style={styles.background}>
            <View style={styles.container}>
            <View style={styles.icon}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("ProjectForm", {project: project})}> 
                    <Ionicons  name="pencil"  size={25}  color='#FFBD33' /> 
                </TouchableWithoutFeedback>
            </View>

            
                <Text style={styles.title}>{project.title}</Text>
                <Text style={styles.subTitle}>Descripción: </Text>
                <Text>{project.description}</Text>
                <Text style={styles.subTitle}>Fecha de Inicio:  <Text style={{fontWeight: 'normal'}}>{project.started.split('T')[0]}</Text></Text>
                <Text style={styles.subTitle}>Tiempo total: <Text style={{fontWeight: 'normal'}}>{time} minutos</Text></Text>
                <Text style={styles.subTitle}>Estado: {ended ? <Text style={{fontWeight: 'normal'}}>Acabado</Text> : <Text style={{fontWeight: 'normal'}}>En proceso</Text>}</Text>
                <Text>{project.finished}</Text>
                <Text style={styles.subTitle}>Fases creadas: </Text>
                    <View style={styles.list}>
                    {
                        phases.length == 0 ?
                        <View style={styles.pill}><Text style={styles.text}>No tienes fases asignadas</Text></View>
                        : <View/>
                    }
                    <FlatList 
                            data={phases}
                            renderItem={({ item }) => <PhaseCard phase={item} getPhases={getPhases} project={project}/> }
                            keyExtractor={(item, index) => {return index.toString()}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}/>
                            }
                        />
                    </View>
            </View>
            <View style={styles.button}>
                <ButtonAdd size={50} action={() => {navigation.navigate('PhaseForm', {project: project})}}/>
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
    icon:{
        position: 'absolute',
        top: 10, 
        right: 20
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
        borderWidth: 0.8,
        borderRadius: 20
    },
    text:{
        fontSize: 16, 
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    pill:{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 8,
        marginTop: '25%',
        alignSelf: 'center', 
        borderRadius: 30,
        justifyContent: 'center'
    },
    button: {
        position: 'absolute',
        bottom: 0, 
        alignSelf: 'center',
        
    }
})