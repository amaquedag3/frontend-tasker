import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = 'tasker.db';

export async function getDbConnection(){
    const db = await openDatabase({name: DATABASE_NAME, location: 'default'});
    return db;
}

export const createTableTask = async(db) => {
    const query = 'CREATE TABLE `tareas` (`id` varchar(45) NOT NULL,`title` varchar(50) NOT NULL,`date` datetime NOT NULL,`finished` datetime DEFAULT NULL,`expectedDuration` int(5) NOT NULL,`duration` int(5) NOT NULL,`distractions` int(5) NOT NULL,`priority` int(11) NOT NULL,`idUser` varchar(20) DEFAULT NULL,`idPhase` varchar(20) DEFAULT NULL);' 
    const result = await db.executeSql(query);
    console.log(result);
}

export const createTableUsers = async(db) => {
    const query = 'CREATE TABLE `usuarios` (`id` varchar(20) NOT NULL,`email` varchar(50) NOT NULL,`password` varchar(100) NOT NULL,`firstname` varchar(20) NOT NULL,`lastname` varchar(50) NOT NULL,`birth` date NOT NULL);'
    const result = await db.executeSql(query)
    console.log(result)
}


export const initDatabase = async() => {
    const db = await getDbConnection();
    console.log('bd creada')
    await createTableTask(db)
    db.close()
}
