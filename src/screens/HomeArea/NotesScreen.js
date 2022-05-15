import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import React from 'react';
import ButtonAdd from '../../components/ButtonAdd';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';import NoteCard from '../../components/Notes/NoteCard';
;


export default function NotesScreen() {

  const navigation = useNavigation();

  const items = [
    { id : 1,
      content: 'Despertarse',
      date: '5:45',
      activado: true
    },
    { id : 2,
      content: 'Ir al curro mamwebo que te quedas sopa ',
      date: '6:30',
      activado: false
    },
    { id : 3,
      content: 'Despertase de siesta',
      date: '17:00',
      activado: false
    },
    { id : 4,
      content: 'A dormir',
      date: '23:30',
      activado: true
    },
  ]


  return (
    <ImageBackground style={styles.background} source={require('../../../assets/moon.jpg')} >
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={items}
            keyExtractor={(reminder) => String(reminder.id)}
            renderItem={({item}) => <NoteCard reminder={item} />}
            />
        </SafeAreaView>
      </View>
      <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center'}}>
        <ButtonAdd action={() => {navigation.navigate('NoteForm')}}/>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 60,
    marginBottom: 30,
    paddingHorizontal: 10,
    height: '72%',
  }
})