
export function generateSELECTQuery(table, param){
    let query = "SELECT * FROM " + table
    if(param)
        query = query + " WHERE " + param + " = ?"
    return query
}

export function generateINSERTQuery(table, colums){
    let query = "INSERT INTO " + table + " ("
    for (let index = 0; index < colums.length; index++) {
        if(index < colums.length - 1)
            query = query + colums[index] + ", "
        else
            query = query + colums[index] + " ) VALUES ( "   
    }
    for (let index = 0; index < colums.length; index++) {
        if(index == colums.length - 1)
            query = query + "? )"
        else
            query = query + "?, "
    }
    return query;
}

export function generateUPDATEQuery(table, colums){
    let query = "UPDATE " + table + " SET "
    let index = 0
    colums.forEach(colum => {
        index++
        query = query + colum + " = ? "
        if(index != colums.length)
            query = query + ", "
    }); 
    query = query + "WHERE id = ?"
    return query;
}

export function generateDELETEQuery(table){
    return "DELETE FROM " + table + " WHERE id = ?"
}


