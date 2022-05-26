var SQLite = require('react-native-sqlite-storage')


export const databaseConnection = {
    getConnection: () => SQLite.openDatabase("tasker.db"),
};

export  function createTableReminders(db){
    const query = "CREATE TABLE IF NOT EXISTS reminders(id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, content VARCHAR(100) NOT NULL)";
    db.transaction(tx => {
        tx.executeSql(query, [])
    })
}

export  function checkTableExists(db){
    const query = "SELECT name FROM sqlite_master WHERE type='table' AND name='reminders'";
    db.transaction(tx => {
        tx.executeSql(query, [], (tx, results) => {
        })
    })
}



export  function getReminders(db){
    db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM `reminders`',
          [],
          (tx, results) => {
            //console.log(results)
          }
        );
      });
}

export  function insertReminder(db){
    //const query = "INSERT INTO `usuarios` VALUES (" + reminder.content + "', '" + reminder.date + "', '" + reminder.active + "', '" + reminder.idUser + "');"
    const query = "INSERT INTO `reminders` (`id`, `content`) VALUES (NULL, 'asd');"
    db.transaction((tx) => {
        tx.executeSql(
            query,
            [],
            (tx, results) => {
                //console.log('Results', results.rowsAffected);
            }
        );
    });
}


