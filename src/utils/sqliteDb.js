import { generateINSERTQuery } from './queryGenerator';

const SQlite = require('expo-sqlite')
const DATABASE_NAME = 'tasker.db';

function getConnection(){
    let db = SQlite.openDatabase({name: DATABASE_NAME},
        () => {},
        error => { console.log(error) }
    )
    return db;
}

export const initDatabase = async() => {
    const db = getConnection()
    console.log('SQLITE DATABASE:', db._db._name.name)

    await createTableTask(db)
    await createTableUser(db)
}

//TAREAS
async function createTableTask(db){
    const query = 'CREATE TABLE IF NOT EXISTS `tareas` (`id` varchar(45) NOT NULL,`title` varchar(50) NOT NULL,`date` datetime NOT NULL,`finished` datetime DEFAULT NULL,`expectedDuration` int(5) NOT NULL,`duration` int(5) NOT NULL,`distractions` int(5) NOT NULL,`priority` int(11) NOT NULL,`idUser` varchar(20) DEFAULT NULL,`idPhase` varchar(20) DEFAULT NULL);' 
    await db.transaction((tx) => {
        tx.executeSql(query)
    })
}

export async function insertUser(user){
    const db = getConnection()
    db.transaction(function(tx){
        tx.executeSql(
            generateINSERTQuery('usuarios', ['id', 'email', 'password', 'firstname', 'lastname', 'birth'])
            [user.id,  user.email, user.password, user.firstname, user.lastname, user.birth],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    console.log('Data Inserted Successfully....');
                } else  console.log('Failed....');
            }
        );
    })
    
}

export function getUsers(){
    const query = "SELECT * FROM `usuarios`"
    const db = getConnection()
    db.transaction(function(tx) {
        tx.executeSql(query, [], function(tx, results){
            console.log(results)
        })
    })
    
}

//USUARIOS
async function createTableUser(db){
    const query = 'CREATE TABLE IF NOT EXISTS `usuarios` (`id` varchar(20) NOT NULL,`email` varchar(50) NOT NULL,`password` varchar(100) NOT NULL,`firstname` varchar(20) NOT NULL,`lastname` varchar(50) NOT NULL,`birth` date NOT NULL);'
    await db.transaction((tx) => {
        tx.executeSql(query)
    })
}

