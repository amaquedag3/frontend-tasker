import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import React from 'react';
import ButtonAdd from '../../components/ButtonAdd';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';import NoteCard from '../../components/Notes/NoteCard';
;


export default function NotesScreen() {

  const navigation = useNavigation();

  const goToProjectForm = () => {
    navigation.navigate("ProjectForm");
  };

  const items = [
    { id : 1,
      content: 'HOla que tal'
    },
    { id : 2,
      content: 'HOla que tal 2'
    },
  ]


  return (
    <ImageBackground style={styles.background} source={require('../../../assets/moon.jpg')} >
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={items}
            numColumns={2}
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
    marginTop: 50,
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: '72%',
  }
})