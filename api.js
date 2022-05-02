import { stringify } from "json5"

const API = 'http://192.168.1.39:3000'

//USERS
export const APIregister= async(newUser) => {
    try {
        const res = await fetch(API + '/register', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'email': newUser.email,
                'password': newUser.password,
                'firstname': newUser.firstname,
                'lastname': newUser.lastname,
                'birth': ''
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

export const APIlogin= async(credentials) => {
    try {
        const res = await fetch(API + '/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'email': credentials.email,
                'password': credentials.password,
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}



//TASKS
export const getTasks = async() => {
    const res = await fetch(API + '/tasks')
    return await res.json()
}

export const getUserTasks = async(idUser) => {
    try {
        const res = await fetch(API + '/tasks/user', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'idUser': idUser
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

export const createTask = async(newTask) => {
    try {
        const res = await fetch(API + '/tasks', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'title': newTask.title,
                'description': newTask.description,
                'date': newTask.date,
                'expectedDuration': newTask.expectedDuration,
                'duration': newTask.duration || 0,
                'priority': newTask.priority || 0,
                'distractions': newTask.distractions || 0,
                'idUser': newTask.idUser,
                'idPhase': newTask.projectPhase
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}


export const deleteTask = async(id) => {
    console.log("ID A ELIMINAR ", stringify(id))
    
    await fetch(API + '/tasks', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}



//PROJECTS

export const getProjects = async() => {
    const res = await fetch(API + '/projects')
    return await res.json()
}

export const getUserProjects = async(idUser) => {
    try {
        const res = await fetch(API + '/projects/user', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'idUser': idUser
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

export const saveProject = async(newProject) => {
    try {
        const res = await fetch(API + '/projects', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'title': newProject.title,
                'description': newProject.description,
                'started': newProject.started,
                'finished': newProject.finished,
                'idUser': newProject.idUser
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};


export const deleteProject = async(id) => {
    console.log("ID A ELIMINAR ", stringify(id))
    
    await fetch(API + '/projects', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}