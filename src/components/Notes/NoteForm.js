import { View, Text, StyleSheet,ImageBackground, TouchableWithoutFeedback , TextInput, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomDateTimePicker from '../CustomDateTimePicker';
import CustomDropdownPicker from '../CustomDropdownPicker';
import CustomTimePicker from '../CustomTimePicker';
import DayPicker from '../DayPicker';


export default function NoteForm(props) {
    const {reminder} = props;
    const options = [
        {id: 1, title: 'Una vez'},
        {id: 2, title: 'De lunes a viernes'},
        {id: 3, title: 'Fin de semana'},
        {id: 4, title: 'Personalizado'}
    ]

    const [error, setError] = useState();
    const [content, setContent] = useState('' );
    const [date, setDate] = useState(new Date())
    const [periodicity, setPeriodicity] = useState()

    const handleSubmit = () => {
        if(validateInput()){
            console.log('correcto')
        }
    }
    useEffect(()=> {
        if(reminder){
            console.log(reminder)
            setContent(reminder.content)
            setDate(reminder.date)
        }
    }, [reminder])

    function validateInput(){
        setError('')
        if(content == ''){
            setError('Introduce un contenido')
            return false
        }

        if(date < new Date(0)){
            setError('No puedes introducir una fecha pasada')
            return false
        }
        if(!periodicity){
            setError('Elige una opcion de alarma')
            return false
        }
        return true
    }

    useEffect(()=>{
        if(periodicity == 4){
            console.log('Custom periodicity')
        }
    }, [periodicity])

    return (
        <ImageBackground style={styles.background} source={require('../../../assets/medusa.jpg')} >
            <View style={styles.container}>
                <Text style={styles.title}>Formulario de Recordatorio</Text>
                <TextInput  
                    placeholder='Contenido'
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    multiline={true}style={styles.input}/>
                
                <View style={{paddingHorizontal: 15, paddingTop: 8}}>
                    <CustomDropdownPicker
                        placeholder={'Selecciona una opcion'}
                        options={options}
                        setSelection={setPeriodicity}/>
                </View>

                {
                    periodicity == 1
                    ? <CustomDateTimePicker inputDate={date}/> :
                    <View>
                        <DayPicker />
                        <CustomTimePicker inputDate={date}/>
                    </View>
                }
                

                {
                    error ? <Text style={styles.error}>{error}</Text> : <View/> 
                }
                

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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        marginHorizontal: 30,
        marginTop: 100,
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        height: '66%'
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
    error: {
        textAlign: "center",
        color: "#f00",
        marginVertical: 10,
        fontSize: 14
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