import { generateINSERTQuery } from './queryGenerator';
import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'tasker.db'

export  function openDataBase(){
    const db = SQLite.openDatabase('tasker.db')
    return db;
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

export function createTableUser(db){
    const query = 'CREATE TABLE IF NOT EXISTS `usuarios` (`id` varchar(20) NOT NULL,`email` varchar(50) NOT NULL,`password` varchar(100) NOT NULL,`firstname` varchar(20) NOT NULL,`lastname` varchar(50) NOT NULL,`birth` date NOT NULL);'

    db.transaction(tx => {
        tx.executeSql(query)
    })
    //db._db.close()
}

export  function insertUser(user){
    const db =  openDataBase()
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


export function initDatabase(){
    const db = openDataBase()
    console.log('SQLITE DATABASE:', db)
    createTableTask(db)
    createTableUser(db)
    //db._db.close()
}

/*
export async function getConnection(){
    const db = await SQLite.openDatabase({name: DATABASE_NAME, location: 'default'})
    return db;
}









export async function getUsers(){
    const query = "SELECT * FROM `usuarios`"
    const db = await getConnection()
    db.transaction(tx => {
        tx.executeSql(query, null, 
            (txObj, { rows: { _array } }) => () => {console.log('SELECT',_array)},
            (txObj, error) => console.log('Error ', error)
        )
    })
}

*/
