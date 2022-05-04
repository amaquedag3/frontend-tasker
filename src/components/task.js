import {v4 as uuidv4} from 'uuid';
import { idExists } from '../utils/exists'
import { generateDELETEQuery, generateINSERTQuery, generateSELECTQuery, generateUPDATEQuery, executeQuery } from '../utils/querys';

const table = "tareas"

export const getAllTasks = async(req, res, next) => {
    try{
        const rows = await executeQuery(generateSELECTQuery(table))
        res.json(rows[0]).status(200);
    }catch(error){
        next(error)
    }
}


export const getTasksByUserId = async(req, res, next) => {
    try{
         //Verificamos que exista el id de usuario
        const exists = await idExists(req.body.idUser, "usuarios")
        if(!exists)
            return res.json('El id de usuario introducido no existe en la base de datos').status(400);
    
        const [rows] = await executeQuery(generateSELECTQuery(table, "idUser"),[req.body.idUser]);
        return res.json(rows).status(200);
    }catch(error){
        next(error);
    }
}


export const createTask = async(req, res, next) => {
    const idTask = uuidv4();
    const {idPhase} = req.body;
    console.log(req.body)
    if(idPhase){//Si no pertenece a una fase
        try{
            console.log('Con Fase')
            //Verificamos que exista el id de la fase a la que pertenece
            const exists = await idExists(idPhase, 'fases')    
            if(!exists)
                return res.json('No existe ese id de fase').status(400);

            await executeQuery(generateINSERTQuery(table, 
                ["id", "title", "date", "expectedDuration" ,"duration", "priority", "distractions", "idUser", "idPhase"]),
                [idTask, req.body.title, req.body.date, req.body.expectedDuration, req.body.duration, req.body.priotity ,req.body.distractions, req.body.idUser, req.body.idPhase]   
            );
            return res.json({message: "Tarea de fase insertada con exito", status: 200}).status(200);

            
           
        }catch(error){
            next(error)
        }
    }else{
        try{
        console.log('Sin Fase')
        //Verificamos que exista el id de usuario
        const exists = await idExists(req.body.idUser, 'usuarios')    
        if(!exists)
            return res.json('No existe ese id de usuario').status(400);

        const [results] = await executeQuery(generateINSERTQuery(table,
            ["id", "title", "date", "expectedDuration" ,"duration", "priority","distractions", "idUser"]),
            [idTask, req.body.title, req.body.date, req.body.expectedDuration, req.body.duration, req.body.priority ,req.body.distractions, req.body.idUser]   
        );
        return res.json({message: "Tarea de fase insertada con exito", results}).status(200);
        }catch(error){
            next(error)
        }
    }   
}


export const updateTask = async(req, res, next) => {
    try{
         //Verificamos que exista el id de la tarea a editar
        const exists = await idExists(req.body.id, table)
        if(!exists)
            return res.json('No se ha encontrado el ide de tarea').status(400);
        await executeQuery(generateUPDATEQuery(table, 
            ["title", "description", "date", "expectedDuration", "duration", "distractions"]),
            [req.body.title, req.body.description, req.body.date, req.body.expectedDuration, req.body.duration, req.body.distractions, req.body.id]);
        return res.json('Tarea editada con exito').status(200);
    }catch(error){
        next(error);
    }
}

export const deleteTask = async(req, res, next) => {
    try{
        //Verificamos que exista el id de la tarea a eliminar
        const exists = await idExists(req.body.id, table)
        if(!exists)
            return res.json('No existe el id de la tarea').status(400);
        await executeQuery(generateDELETEQuery(table), [req.body.id]);
        return res.json('Tarea eliminadda').status(200);
    }catch(error){
        next(error)
    }
}
