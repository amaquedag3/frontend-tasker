const SQlite = require('expo-sqlite')
const DATABASE_NAME = 'tasker.db';

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
    const query = "INSERT INTO `usuarios` VALUES ('" + user.id + "', '" + user.email + "', '" + user.password + "', '" + user.firstname + "', '" + user.lastname || '' + "', '" + user.birth || '' + "');"
    const db = getConnection()
    await db.transaction((tx) => {
        tx.executeSql(query)
    })
    console.log('insertado')
}

export async function getUsers(){
    const query = "SELECT * FROM `usuarios`"
    const db = getConnection()
    try{
        db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                console.log(results)
            })
        })
    }catch(error){
        console.log(error)
    }
}

//USUARIOS
async function createTableUser(db){
    const query = 'CREATE TABLE IF NOT EXISTS `usuarios` (`id` varchar(20) NOT NULL,`email` varchar(50) NOT NULL,`password` varchar(100) NOT NULL,`firstname` varchar(20) NOT NULL,`lastname` varchar(50) NOT NULL,`birth` date NOT NULL);'
    await db.transaction((tx) => {
        tx.executeSql(query)
    })
}

