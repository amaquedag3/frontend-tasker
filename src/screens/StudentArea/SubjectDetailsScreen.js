import { View, Text, ImageBackground, StyleSheet, RefreshControl , FlatList  } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import ButtonAdd from '../../components/ButtonAdd';
import { getExamsBySubjectId } from '../../../api';
import ExamCard from '../../components/Student/ExamCard';

export default function SubjectDetailsScreen(props) {
    const {subject} = props.route.params

    const [exams, setExams] = useState([])
    const [average, setAverage] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    
    const getExams = async() => {
        const result = await getExamsBySubjectId(subject.id)
        setExams(result)
    }

    const onRefresh = React.useCallback(async() =>{
        setRefreshing(true)
        await getExams();
        calculateAverage()
        setRefreshing(false);
    })

    function calculateAverage(){
        if(exams.length == 0){
            setAverage(0)
        }else {
            setAverage(0)
            let sum = 0
            exams.forEach(exam => {
                sum = sum + parseInt(exam.calificacion)
            });
            setAverage(sum / exams.length)
        }
    }

    useEffect(()=>{
        calculateAverage()
    }, [exams])

    useEffect(async() => {
        getExams()
        calculateAverage()
    }, [])
    

    return (
        <ImageBackground source={require('../../../assets/sun-flower.jpg')} style={styles.background}>
            <View style={styles.container}>
        
                {/*
                <View style={styles.icon}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("SubjectForm", {subject: subject})}> 
                        <Ionicons  name="pencil"  size={25}  color='#FFBD33' /> 
                    </TouchableWithoutFeedback>
                </View>
                */}
                
                <Text style={styles.title}>{subject.nombre}</Text>
                <Text style={styles.subTitle}>Media de Examenes:  <Text style={{fontWeight: 'normal'}}>{(Math.round(average * 100) / 100).toFixed(2)}</Text></Text>
                <View style={styles.list}>
                    {
                        exams.length == 0 ? 
                        <View style={styles.pill}><Text style={styles.text}>No tienes examenes añadidos</Text></View>
                        : <View/>
                    }
                    <FlatList 
                        data={exams}
                        renderItem={({ item }) => <ExamCard exam={item} getExams={getExams}/> }
                        keyExtractor={(item, index) => {return index.toString()}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}/>
                        }
                    />
                </View>
                <View style={styles.button}>
                    <ButtonAdd size={50} action={() => {navigation.navigate('ExamForm', {subject})}}/>
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
        height: '70%',
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
        height: '3%',
        width: '80%',
        position: 'absolute',
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