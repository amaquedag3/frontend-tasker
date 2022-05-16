import { generateINSERTQuery } from './queryGenerator';
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'tasker.db'

export  function openDataBase(){
    const db = SQLite.openDatabase('tasker.db')
    return db;
}


export function initDatabase(db){
    console.log('SQLITE DATABASE:', db)
    createTableTask(db)
    createTableUser(db)
    //db._db.close()
}



export  function selectQuery(){
    const db = openDataBase()
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM usuarios;`,
            [doneHeading ? 1 : 0],
            (_, { rows: { _array } }) => console.log(_array)
        );
    });
}


export function createTableTask(db){
    const query = 'CREATE TABLE IF NOT EXISTS `tareas` (`id` varchar(45) NOT NULL,`title` varchar(50) NOT NULL,`date` datetime NOT NULL,`finished` datetime DEFAULT NULL,`expectedDuration` int(5) NOT NULL,`duration` int(5) NOT NULL,`distractions` int(5) NOT NULL,`priority` int(11) NOT NULL,`idUser` varchar(20) DEFAULT NULL,`idPhase` varchar(20) DEFAULT NULL);' 

    db.transaction(tx => {
        tx.executeSql(query)
    })
    //db._db.close()
}

export function createTableReminder(db){
    const query = "CREATE TABLE IF NOT EXISTS `recordatorios` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, content VARCHAR(50), periodicity LONGTEXT, active TINYINT(1));"

}

export function createTableUser(db){
    const query = 'CREATE TABLE IF NOT EXISTS `usuarios` (`id` varchar(20) NOT NULL,`email` varchar(50) NOT NULL,`password` varchar(100) NOT NULL,`firstname` varchar(20) NOT NULL,`lastname` varchar(50) NOT NULL,`birth` date NOT NULL);'

    db.transaction(tx => {
        tx.executeSql(query)
    })
    //db._db.close()
}

export  function insertUser(db ,user){
    db.transaction(
        (tx) => {
            tx.executeSql(
                generateINSERTQuery('usuarios', ['id', 'email', 'password', 'firstname', 'lastname', 'birth']), 
                [user.id,  user.email, user.password, user.firstname, user.lastname, user.birth],);
            tx.executeSql("select * from usuarios", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
            );
        },
        null
    );
    
}


