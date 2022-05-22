import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, {useState} from 'react'
import CustomDateTimePicker from '../../components/CustomDateTimePicker';
import CustomModal from '../../components/CustomModal';
import { useNavigation } from "@react-navigation/native";
import useAuth from '../../hooks/useAuth';
import { wait } from '../../utils/wait';
import { saveTransaction } from '../../../api';

export default function TransactionsFormScreen(props) {
    const {type} = props.route.params;

    const [reason, setReason] = useState('')
    const [amount, setAmount] = useState()
    const [date, setDate] = useState(new Date())

    const navigation = useNavigation();
    const { userData } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [error, setError] = useState('')

    async function handleSubmit(){
        if(validateInput()){
            const newTransaction = {
                reason : reason,
                amount: amount,
                type: type,
                date:  date,
                idUser: userData.id
            }
            await saveTransaction(newTransaction)
            setModalText('!Transacción guardada!')
            setModalVisible(true)
            await wait(1200)
            navigation.goBack()
        }
    }

    async function validateInput(){
        setError('')
        if(reason == ''){
            setError('Introduce un motvo')
            return false;
        }
        if(amount == undefined || amount <= 0){
            setError('Introduce un importe válido')
            return false;
        }

        return true
    }


    return (
        <>
            {
                modalVisible ?
                <CustomModal 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    modalText={modalText}
                    setModalText={setModalText}
                />
                : <View/>
            }
            <ImageBackground source={require('../../../assets/iffel.jpg')} style={styles.background}>            
                <View style={styles.container}>
                    <View style={styles.form}>
                        {
                            type == 'wastes' ?
                            <Text style={styles.title}>Formulario de Gasto</Text> :
                            <Text style={styles.title}>Formulario de Ingreso</Text>
                        }
                        <TextInput
                            placeholder="Motivo"
                            style={styles.input}
                            autoCapitalize="none"
                            value={reason}
                            onChangeText={(text) => setReason(text)}
                        />
                        <View style={{marginHorizontal: 25}}>
                            <CustomDateTimePicker inputDate={date} setInputDate={setDate}/>
                        </View>
                        
                        
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={styles.label}>Importe:</Text>
                            <TextInput 
                                style={styles.number}
                                keyboardType='numeric'
                                onChangeText={(text)=> setAmount(text)}
                                value={amount}
                                maxLength={10} 
                            />
                            <Text style={styles.label}>€</Text>
                        </View>
                        {
                            error ? <Text style={styles.error}>{error}</Text> : <View/>
                        }
                        <View style={styles.btn}>
                            <TouchableWithoutFeedback onPress={handleSubmit}>
                                <Text style={styles.buttonText}> Guardar </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}


const styles = StyleSheet.create({
    background:{
        width: '100%',
        height: '100%'
    },
    container:{
        padding: 35,
        height: '60%'
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 30,
        elevation: 150,
        marginTop: 80
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Roboto',
        marginVertical: 20
    },
    input: {
        height: 35,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F2F1F1',
        marginHorizontal: 40,
        marginVertical: 10
    },
    label: {
        paddingVertical: 10,
        paddingHorizontal:  5,
        fontWeight: 'bold'
    },
    number: {
        height: 35,
        width: 100,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F2F1F1',
        alignSelf: 'center',
        textAlign: 'center'
    },
    error: {
        textAlign: "center",
        color: "#f00",
        marginVertical: 10,
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
        padding: 8,
        fontSize: 15
    }
})