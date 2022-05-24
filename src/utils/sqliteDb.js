import { generateINSERTQuery } from './queryGenerator';
const SQlite = require('expo-sqlite')


const DATABASE_NAME = 'tasker.reminders'


function getConnection(){
    let db = SQlite.openDatabase(
        {name: DATABASE_NAME, location: 'default'},
        () => {},
        error => { console.log(error) }
    )
    return db;
}

export const initDatabase = async() => {
    const db = getConnection()
    console.log('SQLITE DATABASE:', db._db._name.name)
    await createTableReminders(db)
}


export async function createTableReminders(db){
    const query = "CREATE TABLE `reminders` (`id` int(11) NOT NULL AUTO_INCREMENT,`content` varchar(100) NOT NULL,`date` datetime NOT NULL,`active` tinyint(4) NOT NULL, `idUser` varchar(50)) ";
    await db.transaction(tx => {
        tx.executeSql(query)
    })
}


export async function getReminders(idUser){
    const query = "SELECT * FROM `reminders`"
    const db = getConnection()
    db.transaction(tx => {
        tx.executeSql(query, null, // passing sql query and parameters:null
          // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => console.log(_array), 
          // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('Error ', error)
          ) // end executeSQL
      }) // end tra
}

export async function insertReminder(reminder){
    console.log(reminder)
    //const query = "INSERT INTO `usuarios` VALUES (" + reminder.content + "', '" + reminder.date + "', '" + reminder.active + "', '" + reminder.idUser + "');"
    const query = "INSERT INTO `reminders` VALUES (" + "example" + "', '" + new Date() + "', '" + 1 + "', '" + 1 + "');"
    const db = getConnection()

    db.transaction(tx => {
        tx.executeSql(query, ['example', new Date, 1, 1],
            (txObj, resultSet) => console.log('insert'),
            (txObj, error) => console.log('Error', error))
    })
}


