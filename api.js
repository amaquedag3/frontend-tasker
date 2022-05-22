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



//---------------------TASKS---------------------
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
export const getUserEndedTasks = async(idUser) => {
    try {
        const res = await fetch(API + '/tasks/user', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'idUser': idUser,
                'extra': 'finished'
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

export const getUserTodoTasks = async(idUser) => {
    try {
        const res = await fetch(API + '/tasks/user', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'idUser': idUser,
                'extra': 'todo'
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}


export const getTasksByPhaseId = async(idPhase) => {
    try {
        const res = await fetch(API + '/tasks/phase', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'idPhase': idPhase,
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


export const updateTask = async(task) => {
    try {
        const res = await fetch(API + '/tasks', {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: task.title,
                date: task.date,
                finished: task.finished,
                expectedDuration: task.expectedDuration,
                duration: task.duration,
                priority : task.priority,
                distractions : task.distractions || 0,
                idPhase: task.idPhase || '',
                idUser: task.idUser || '',
                id: task.id
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};


export const deleteTask = async(id) => {
    await fetch(API + '/tasks', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}



//---------------------PROJECTS---------------------

export const getProjects = async() => {
    const res = await fetch(API + '/projects')
    return await res.json()
}

export const getProjectById = async(id) => {
    try {
        const res = await fetch(API + '/projects/id', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'id': id
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
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

export const getProjectTime = async(id) => {
    try {
        const res = await fetch(API + '/projects/time', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'id': id
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}


export const createProject = async(newProject) => {
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

export const updateProject = async(project) => {
    try {
        const res = await fetch(API + '/projects', {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'title': project.title,
                'description': project.description,
                'started': project.started,
                'finished': project.finished || '',
                'idUser': project.idUser,
                'id': project.id
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};




export const deleteProject = async(id) => {
    await fetch(API + '/projects', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}


//---------------------FASES---------------------

export const getPhasesByProjectId = async(idProject) => {
    try {
        const res = await fetch(API + '/phases/project', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'idProject': idProject
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

export const getPhaseById = async(id) => {
    try {
        const res = await fetch(API + '/phases/id', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'id': id
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}


export const savePhase = async(newPhase) => {
    try {
        const res = await fetch(API + '/phases', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'title': newPhase.title,
                'description': newPhase.description,
                'started': newPhase.started,
                'finished': newPhase.finished,
                'idProject': newPhase.idProject
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};

export const updatePhase = async(phase) => {
    try {
        const res = await fetch(API + '/phases', {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'title': phase.title,
                'description': phase.description,
                'started': phase.started,
                'finished': phase.finished,
                'id': phase.id
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};


export const deletePhase = async(id) => {
    await fetch(API + '/phases', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}


//---------------------ASIGNATURAS---------------------


export const saveSubject = async(newSubject) => {
    console.log(newSubject)
    try {
        const res = await fetch(API + '/subjects', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'nombre': newSubject.name,
                'schedule': newSubject.horario,
                'idUser': newSubject.idUser
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};


export const getSubjectsByUserId = async(idUser) => {
    try {
        const res = await fetch(API + '/subjects/user', {
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
};

export const deleteSubject = async(id) => {
    await fetch(API + '/subjects', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}


//---------------------EXAMENES---------------------


export const getExamsBySubjectId = async(idSubject) => {
    try {
        const res = await fetch(API + '/exams/subject', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'idSubject': idSubject
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};


export const deleteExam = async(id) => {
    await fetch(API + '/exams', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}


export const saveExam= async(newExam) => {
    console.log(newExam)
    try {
        const res = await fetch(API + '/exams', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'title': newExam.title,
                'calification': newExam.calification,
                'date': newExam.date,
                'idSubject': newExam.idSubject
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};

//---------------------TRANSACCIONES---------------------

export const getTransactionsByUserId = async(idUser) => {
    try {
        const res = await fetch(API + '/expenses/user', {
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
};


export const saveTransaction= async(newTransaction) => {
    try {
        const res = await fetch(API + '/expenses', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'reason': newTransaction.reason,
                'amount': newTransaction.amount,
                'date': newTransaction.date,
                'type': newTransaction.type,
                'idUser': newTransaction.idUser
            }),
        });
        return await res.json();
    } catch (error) {
        console.log(error)
    }
};

export const deleteTransaction = async(id) => {
    await fetch(API + '/expenses', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'id': id})
    });
}
