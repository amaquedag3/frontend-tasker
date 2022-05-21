import { View, Text, StyleSheet, ImageBackground, RefreshControl } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import ButtonAdd from '../../components/ButtonAdd';
import { getSubjectsByUserId } from '../../../api';
import { FlatList } from 'react-native-gesture-handler';
import SubjectCard from '../../components/Student/SubjectCard';

export default function StudentScreen() {

  const navigation = useNavigation();
  const { userData } = useAuth()
  const [subjects, setSubjects] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const loadSubjects = async() =>{
    const data = await getSubjectsByUserId(userData.id)
    setSubjects(data)   
  }
  
  const onRefresh = React.useCallback(async() =>{
    setRefreshing(true);
    await loadSubjects();
    setRefreshing(false);
  })

  useEffect(async() => {
    loadSubjects()
  }, [])
  

  return (
    <ImageBackground source={require('../../../assets/moon.jpg')} style={styles.background}> 
      <View style={styles.container}>
        <Text style={styles.title}>Estudiante</Text>
        
        <FlatList
          data={subjects}
          renderItem={({item}) =>
            <SubjectCard 
              subject={item}
              loadSubjects={loadSubjects}/>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}/>
          }
        />
        {
            subjects.length == 0 ? <View style={styles.pill}><Text style={styles.text}>No tienes asignaturas creadas</Text></View>
            : <View></View>
        }

        <View style={styles.buttonBox}>
          <ButtonAdd size={50} action={() => {navigation.navigate('SubjectForm')}}/>
        </View>  
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  container:{
    paddingHorizontal: '5%',
    height: '88%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: '12%',
    marginHorizontal: '8%',
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
  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10
  },
  buttonBox: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  }

})