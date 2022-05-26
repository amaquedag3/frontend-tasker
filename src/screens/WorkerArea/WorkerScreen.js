import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Progress from 'react-native-progress';
import { useNavigation } from "@react-navigation/native";
import ButtonAdd from '../../components/ButtonAdd';
import { getTransactionsByUserId } from '../../../api';
import useAuth from '../../hooks/useAuth';
import TransactionList from '../../components/Worker/TransactionList';

//Pantalla de transacciones
export default function WorkerScreen() {
  //estados
  const [transactions, setTransacctions] = useState()
  const [wastes, setWastes] = useState([])
  const [incomes, setIncomes] = useState([])
  const [amountWastes, setAmountWastes] = useState(0)
  const [amountIncomes, setAmountIncomes] = useState(0)
  const [percentageIncomes, setPercentageIncomes] = useState(0)

  const { userData } = useAuth();
  const navigation = useNavigation()
//Funcion que obteiene las transacciones del usuarios
  const getUserTransactions = async() => {
    const data = await getTransactionsByUserId(userData.id)
    setTransacctions(data)
  }
  //Funcion que separa las tansaccioes en funcion de si son gastos o ingresos
  function separeTransactions(){
    if(transactions){
      let auxWastes = []
      let auxIncomes = []
      transactions.forEach(transaction => {
        if(transaction.tipo == 'wastes'){
          auxWastes.push(transaction)
        }else{
          auxIncomes.push(transaction)
        }
      });
      setWastes(auxWastes)
      setIncomes(auxIncomes)
    }
  }
  //función que separa los importes y los suma en función de sus tipo
  function separeAmounts(){
    if(wastes){
      let sum = 0
      wastes.forEach(waste => {
        sum = sum + parseInt(waste.importe)
      });
      setAmountWastes(sum)
    }
    if(incomes){
      let sum = 0
      incomes.forEach(income => {
        sum = sum + parseInt(income.importe)
      });
      setAmountIncomes(sum)
    }
    calculatePercentage()
  }
  //función que calcula indice para represnetar en el diagrama
  function calculatePercentage(){
    if(amountIncomes > 0 && amountWastes > 0){
      setPercentageIncomes(amountIncomes / (amountIncomes + amountWastes))
    }else if(amountIncomes > 0 && amountWastes == 0){
      setPercentageIncomes(1)
    }else if(amountWastes> 0 && amountIncomes == 0){
      setPercentageIncomes(0)
    }else{
      setPercentageIncomes(1)
    }
  }
   // se activa vuando hay cambios en los gastos y los ingresos
  useEffect(() => {
    separeAmounts()
    calculatePercentage()
  }, [wastes, incomes])
  // se activa vuando hay cambios en las transcciones
  useEffect(async() => {
    separeTransactions()
    separeAmounts()
    calculatePercentage()
  }, [transactions])

  useEffect(async() => {
    getUserTransactions()
    calculatePercentage()
  }, [])


  return (
    <ImageBackground source={require('../../../assets/desktop.jpg')} style={styles.background}> 
      <View style={styles.container}>
      <Text style={styles.title}>Gastos e Ingresos</Text>
        <View style={styles.progressContainer}>
          <Progress.Pie 
            progress={ percentageIncomes }
            color='green'
            unfilledColor='red' 
            size={180} />
        </View>
        <View style={styles.subContainer}>
          
          <View style={styles.column}>
            <Text style={styles.subTitle}>Gastos: <Text style={{fontWeight: 'normal'}}>{ amountWastes }€</Text></Text>
            
            <TransactionList transactions={wastes} getUserTransactions={getUserTransactions}/>
            
            <View style={styles.buttonBox}>
              <ButtonAdd action={()=>{navigation.navigate('TransactionsForm', {type: 'wastes'})}} size={30}/>
            </View>
          </View>
          
          <View style={styles.column}>
            <Text style={styles.subTitle}>Ingresos: <Text style={{fontWeight: 'normal'}}>{ amountIncomes }€</Text></Text>

            <TransactionList transactions={incomes} getUserTransactions={getUserTransactions}/>

            <View style={styles.buttonBox}>
              <ButtonAdd action={()=>{navigation.navigate('TransactionsForm', {type: 'incomes'})}} size={30}/>
            </View>
          </View>
        </View>
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
    paddingHorizontal: '3%',
    height: '88%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: '12%',
    marginHorizontal: '5%',
    borderRadius: 20,
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center'
  },
  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10
  },
  subContainer: {
    flexDirection: 'row',
    height: '58%'
  },
  column: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 10
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10
  },
  buttonBox:{
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  }

})