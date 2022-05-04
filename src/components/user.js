import { hashPassword, comparePasswords} from '../utils/hash';
import { emailExists, idExists } from '../utils/exists';
import { generateDELETEQuery, generateINSERTQuery, generateSELECTQuery, generateUPDATEQuery, executeQuery } from '../utils/querys';
import {v4 as uuidv4} from 'uuid';
import { signJWT } from '../middlewares/authHandler';

const table = "usuarios"

export const getAllUsers = async(req, res, next) => {
    try{
        const rows = await executeQuery(generateSELECTQuery(table))
        res.json(rows[0]).status(200);
    }catch(error){
        next(error);
    } 
}

export const register = async(req, res, next) => {
    try {
        const {password, email} = req.body;
        const exists = await emailExists(email);
        //Verficamos si el email ya existe
        if(exists){ 
            return res.json({message: "Este email ya está en uso", status: 400}).status(400)  
        }

        //Generamos id y un hash de la contraseña 
        const idUser = uuidv4();
        const hash = await hashPassword(password);
        //Consulta
        const result = await executeQuery(generateINSERTQuery(table, ["id", "email", "password", "firstname", "lastname", "birth"]),
        [idUser, req.body.email, hash, req.body.firstname, req.body.lastname, req.body.birth]);
        return result.json({message: "Usuario registrado con exito", status: 200}).status(200)
    }catch(error){
        next(error)
    }
}

export const login = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        const exists = await emailExists(email);
        //Verificamos que el email existe
        if(!exists) 
            return res.json({message: "Email no encontrado", status: 400}).status(400)  
    
        //Obtenemos su contraseña hasheada
        const [result] = await executeQuery(generateSELECTQuery(table, "email"), [email]);
        const hash = result[0].password;
        const match = await comparePasswords(password, hash);
        //Y verificamos si coinciden
        if(!match)
            return res.json({message: "La contraseña no es correcta", status: 400}).status(400);
        //Generamos token
        const token = signJWT(result[0].email, result[0].password)
        return res.json({
            message: "Login correcto" ,
            user: result[0], 
            token: token,
            status: 200
        }).status(200) // TO DO --> incrementar intentos
    }catch(error){
        next(error);
    }
}


export const updateUser = async(req, res, next) => {
    try{
        //Verificamos que el id del usuario a editar existe
        let exists = await idExists(req.body.id, "usuarios");
        if(!exists)
            return res.json("El id introducido no existe en la base de datos").status(400)

        //Verificamos que el nuevo email no se encuentra en la bd
        exists = await emailExists(req.body.email);
        if (exists)
            return res.json("El email introducido ya está en uso por otro usuario").status(401)

        const hash = await hashPassword(req.body.password) //HASH DE LA CONTRASEÑA EDITADA
        executeQuery(
            generateUPDATEQuery(table, ["email", "password", "firstname", "lastname", "birth"]),
            [req.body.email, hash, req.body.firstname, req.body.lastname, req.body.birth, req.body.id]
        )
        return res.json("Usuario editado satisfactoriamente").status(200);
    }catch(error){
        next(error);
    }
}


export const deleteUser = async(req, res, next) => {
    try{
        const exists = await idExists(req.body.id, "usuarios");
        if(!exists)
            return res.json("El id introducido no existe").status(400)  
        
        executeQuery(generateDELETEQuery(table), [req.body.id]);
        return res.json('Usuario eliminado').status(200);
    }catch(error){
        next(error);
    }
}

