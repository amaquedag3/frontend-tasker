import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import ButtonAdd from '../../components/ButtonAdd';

export default function StudentScreen() {

  const { userData } = useAuth()
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../../assets/moon.jpg')} style={styles.background}> 
      <View style={styles.container}>
        <Text style={styles.title}>Estudiante</Text>

        <View style={styles.subcontainer}>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: '0', alignSelf: 'center'}}>
        <ButtonAdd />
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
  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10
  },
  subcontainer: {
    backgroundColor: 'red',
    height: '50%',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%'
  }

})