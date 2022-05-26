import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonAdd from '../../components/ButtonAdd';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteCard from '../../components/Notes/NoteCard';



export default function NotesScreen() {
  const [reminders, setReminders] = useState(
    {
      id: 1,
      content: 'example',
      hour: new Date()
    }
  )

  const { userData } = useAuth()
  const navigation = useNavigation();

  const loadReminders = async() => {
    //const data = await getReminders(userData.id)
    console.log('Reminders:', data)
    setReminders(data)
  }

  const onRefresh = React.useCallback(async() =>{
    //await loadReminders()
  })

  useEffect(async () => {
    //await loadReminders()
  }, [])
  


  return (
    <ImageBackground style={styles.background} source={require('../../../assets/moon.jpg')} >
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={reminders}
            keyExtractor={(reminder) => String(reminder.id)}
            renderItem={({item}) => <NoteCard reminder={item} />}
          />
            {
              reminders == undefined ?
              <Text>No tienes Recordatorios</Text> : <View/>
            }
        </SafeAreaView>
      </View>
      <View style={{ position: 'absolute', bottom: '7%', alignSelf: 'center'}}>
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
    marginHorizontal: '7%',
    marginTop: '12%',
    marginBottom: 30,
    paddingHorizontal: 10,
    height: '72%',
  }
})