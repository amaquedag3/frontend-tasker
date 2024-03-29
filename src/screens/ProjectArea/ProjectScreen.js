import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { getUserProjects } from '../../../api';
import ProjectList from '../../components/Projects/ProjectList';
import ButtonAdd from '../../components/ButtonAdd';
import useAuth from '../../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

//Pantalla principal de proyectos
export default function ProjectsScreen() {
  const [projects, setProjects] = useState(undefined);
  const { userData } = useAuth();

  //Funcion que carga los proyectos del usuario ed la API
  const loadProjects = async() => {
    const data = await getUserProjects(userData.id)
    if(data)
      setProjects(data)
  }
  useEffect(()=> {
    loadProjects()
  }, [])

  const navigation = useNavigation();
    
  return (
    <ImageBackground source={require('../../../assets/night-landscape.jpg')} style={styles.background}>
      <View>
        <SafeAreaView style={styles.container} >
          {projects ? 
          <ProjectList projects={projects} loadProjects={loadProjects}/> : 
          <Text style={styles.noProjects}>No tienes proyectos creados</Text>}
          
        </SafeAreaView>
        <ButtonAdd action={() => navigation.navigate("ProjectForm")}/>
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