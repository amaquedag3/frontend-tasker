import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback , TextInput, Button} from 'react-native';
import React, {useState} from 'react'
import DatePicker from '../DatePicker';
import TimePicker from 'react-native-date-picker'

export default function NoteForm() {
    const [content, setContent] = useState();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {

    }

    return (
        <ImageBackground style={styles.background} source={require('../../../assets/medusa.jpg')} >
            <View style={styles.container}>
                <Text style={styles.title}>Formulario de Recordatorio</Text>
                <TextInput  
                    placeholder='Contenido'
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    multiline={true}style={styles.input}/>
                <View style={styles.calendar}>
                        <TextInput
                            placeholder="Fecha"
                            style={styles.inputDate}
                            autoCapitalize="none"
                            editable={false}>   
                            {date}                             
                        </TextInput>
                        <DatePicker setDate={setDate}/>
                </View>
                <TimePicker date={ date } onDateChange={setDate} />
                <View style={styles.btn}>
                    <TouchableWithoutFeedback onPress={handleSubmit}>
                        <Text style={styles.buttonText}> Guardar </Text>
                    </TouchableWithoutFeedback>
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        marginHorizontal: 30,
        marginTop: 90,
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        height: '75%'
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'Roboto',
        marginVertical: 14
    },input: {
        height: '30%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 8
    },
    calendar:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        alignSelf: 'center'
    },
    inputDate: {
        height: 40,
        width: '60%',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 10,
        marginVertical: 10,
        color: 'black',
        textAlign: 'center'
    },
    btn:{
        backgroundColor: '#49A1F9',
        marginHorizontal: 90,
        marginVertical: 15,
        borderRadius: 20,
        alignItems: 'center'
    },
    buttonText:{
        alignSelf: 'center',
        color: 'white',
        padding: 10,
        fontSize: 18
    }
})