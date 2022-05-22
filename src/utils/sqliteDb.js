import { generateINSERTQuery } from './queryGenerator';
import * as SQLite from 'expo-sqlite';


const DATABASE_NAME = 'tasker.reminders'

export async function openDataBase(){
    const db = await SQLite.openDatabase(DATABASE_NAME)
    return db;
}


export async function initDataBase(){
    const db = openDataBase()
    await createTableReminders(db)
}


export async function createTableReminders(db){
    const query = "CREATE TABLE `reminders` (`id` int(11) NOT NULL,`content` varchar(100) NOT NULL,`date` datetime NOT NULL,`active` tinyint(4) NOT NULL, `idUser` varchar(50)) ";
    await db.transaction(tx => {
        tx.executeSql(query)
    })
}

export async function getUserReminders(idUser){
    const db = await openDataBase()
    db.transaction(tx => {
        (tx.executeSql('SELECT * FROM reminders', null,
            (txObj, {rows: {_array}}) => console.log(_array)),
            (txObj, error) => console.log('Error ', error)
    )
})

}



    
export const insertReminder = async (reminder) => {
    const db = await openDataBase()
    return new Promise((resolve, reject) => {
    db.transaction((tx) => {
        tx.executeSql(
            generateINSERTQuery('reminders', ['content', 'date', 'active', 'idUser']),
            [ reminder.content, reminder.date, reminder.active, reminder.idUser],
          (_, result) => resolve(result),
          (_, err) => reject(err),
        );
      });
    });
  };


