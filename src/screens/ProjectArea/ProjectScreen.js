import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { getUserProjects } from '../../../api';
import ProjectList from '../../components/Projects/ProjectList';
import ButtonAdd from '../../components/ButtonAdd';
import useAuth from '../../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState(undefined);
  const { userData } = useAuth();

  const loadProjects = async() => {
    const data = await getUserProjects(userData.user.id)
    if(data)
      setProjects(data)
  }
  useEffect(()=> {
    loadProjects()
  }, [])

  const navigation = useNavigation();
    
  const goToProjectForm = () => {
      navigation.navigate("ProjectForm");
  };



  return (
    <ImageBackground source={require('../../../assets/sun-flower.jpg')} style={styles.background}>
      <View>
        <SafeAreaView style={styles.container} >
          {projects ? 
          <ProjectList projects={projects} loadProjects={loadProjects}/> : 
          <Text style={styles.noProjects}>No tienes proyectos creados</Text>}
          
        </SafeAreaView>
        <ButtonAdd action={goToProjectForm}/>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create(
  {
    background:{
      width: '100%',
      height: '100%',
    },
    container: {
      height: '83%'
    },
    noProjects: {
      paddingVertical: 80,
      alignSelf: 'center',
      fontSize: 15,
      fontFamily: 'Roboto_Medium'
    }
  }
)