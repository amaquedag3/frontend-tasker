import { generateINSERTQuery } from './queryGenerator';
import * as SQLite from 'expo-sqlite';



const db = SQLite.openDatabase('dbName');

db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
    console.log('Foreign keys turned on')
);




//const SQlite = require('expo-sqlite')
const DATABASE_NAME = 'tasker.db';

export async function getConnection(){
    const db = await openDatabase({name: DATABASE_NAME, location: 'default'})
    return db;
}


async function createTableTask(db){
    const query = 'CREATE TABLE IF NOT EXISTS `tareas` (`id` varchar(45) NOT NULL,`title` varchar(50) NOT NULL,`date` datetime NOT NULL,`finished` datetime DEFAULT NULL,`expectedDuration` int(5) NOT NULL,`duration` int(5) NOT NULL,`distractions` int(5) NOT NULL,`priority` int(11) NOT NULL,`idUser` varchar(20) DEFAULT NULL,`idPhase` varchar(20) DEFAULT NULL);' 
    await db.executeSql(query)
}

async function createTableUser(db){
    const query = 'CREATE TABLE IF NOT EXISTS `usuarios` (`id` varchar(20) NOT NULL,`email` varchar(50) NOT NULL,`password` varchar(100) NOT NULL,`firstname` varchar(20) NOT NULL,`lastname` varchar(50) NOT NULL,`birth` date NOT NULL);'
    await db.executeSql(query)
}


export const initDatabase = async() => {
    const db = getConnection()
    console.log('SQLITE DATABASE:', db._db._name.name)

    await createTableTask(db)
    await createTableUser(db)
    db.close()
}

export async function insertUser(user){
    const db = getConnection()
    console.log('SQLITE get db in insert:', db._db._name.name)

    db.transaction(tx => {
        tx.executeSql(
            generateINSERTQuery('usuarios', ['id', 'email', 'password', 'firstname', 'lastname', 'birth']), 
            [user.id,  user.email, user.password, user.firstname, user.lastname, user.birth],
            (txObj, resultSet) => console.log(result),
            (txObj, error) => console.log('Error', error))
    })
    
}

export function getUsers(){
    const query = "SELECT * FROM `usuarios`"
    const db = getConnection()
    db.transaction(tx => {
        tx.executeSql(query, null, 
            (txObj, { rows: { _array } }) => console.log(_array),
            (txObj, error) => console.log('Error ', error)
        )
    })
}

//USUARIOS
