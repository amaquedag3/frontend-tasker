import {v4 as uuidv4} from 'uuid'
import {idExists} from '../utils/exists'
import { generateDELETEQuery, generateINSERTQuery, generateSELECTQuery, generateUPDATEQuery, executeQuery } from '../utils/querys';

const table = "proyectos"


export const getAllProjects = async(req, res, next) => {
    try{
        const rows = await executeQuery(generateSELECTQuery(table))
        res.json(rows[0]).status(200);
    }catch(error){
        next(error);
    } 
}


export const getProjectsByUserId = async(req, res, next) => {
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

export const createProject = async(req, res, next) => {
    console.log(req.body)
    try{
        //Verificamos que exista el id del usuario
        const exists = await idExists(req.body.idUser, 'usuarios')    
        if(!exists)
            return res.json('El id de usuario introducido no existe en la base de datos').status(400);
        const id = uuidv4();
        const [results] = await executeQuery(generateINSERTQuery(table,
            ["id", "title", "description", "started", "finished", "idUser"]),
            [id, req.body.title, req.body.description, req.body.started, req.body.finished || '', req.body.idUser]);
        return res.json({message: "Proyecto insertado con exito", status: 200}).status(200);
    }catch(error){
        console.log(error)
    }
}

export const updateProject = async(req, res, next) => {
    try{
        //Verificamos que exista el id a editar
        const exists = await idExists(req.body.id, table)
        if(!exists)
            return res.json('No se ha encontrado el id del proyecto').status(400);
        await executeQuery(generateUPDATEQuery(table, 
            ["title", "description", "started", "finished", "id"]),
            [req.body.title, req.params.description, req.body.started, req.body.finished,  req.body.id]);
        return res.json({'message': 'Proyecto editado con exito'}).status(200);
    }catch(error){
        next(error);
    }
}

export const deleteProject = async(req, res, next) => {
    console.log(req.body)
    try{
        //Verificamos que exista el id de la nota a eliminar
        const exists = await idExists(req.body.id, table)
        if(!exists)
            return res.json('No existe el id').status(400);
            
        await executeQuery(generateDELETEQuery(table), [req.body.id]);
        return res.json('Proyecto eliminado').status(200);
    }catch(error){
        next(error)
    }
}
