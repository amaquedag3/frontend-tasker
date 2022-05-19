import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native'
import React, {useState} from 'react'
import DayPicker from '../../components/DayPicker'

export default function SubjectFormScreen() {
  const [name, setName] = useState()

  return (
    <ImageBackground source={require('../../../assets/sea.jpg')} style={styles.background}> 
      <View style={styles.container}>
          <Text style={styles.title}>Formulario de Asinatura</Text>
          <TextInput
            placeholder="Nombre"
            style={styles.input}
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <View style={styles.dayPickerBox}>
            <Text style={styles.subTitle}>Horario: </Text>
            <DayPicker />
          </View>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  background:{
      width: '100%',
      height: '100%',
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
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  },
  input: {
    height: 38,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 40,
  },
  dayPickerBox: {
    marginVertical: '4%'
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "bold",
    paddingLeft: '6%',
    marginBottom: '2%'
},
})