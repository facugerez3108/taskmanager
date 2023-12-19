import { 
    GET_TASKS_SUCCESS, GET_TASKS_FAIL, 
    GET_TASK_SUCCESS, GET_TASK_FAIL, 
    CREATE_TASK_SUCCESS, CREATE_TASK_FAIL, 
    DELETE_TASK_SUCCESS, DELETE_TASK_FAIL, 
    UPDATE_TASK_SUCCESS, UPDATE_TASK_FAIL 
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";


export const create_task = (title, description, done) => async dispatch => {
    if(document.cookie.includes("Authorization")){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const body = JSON.stringify({title, description, done})
        
        try {

            const res = await axios.post(`http://localhost:5000/api/task/create`, body, config)
            console.log(res)

            if(res.status === 200){
                
                dispatch({
                    type: CREATE_TASK_SUCCESS,
                    payload: res.data
                })
                
                dispatch(
                    setAlert("Tarea creada con éxito", "success"))
            }else{
                
                dispatch({
                    type: CREATE_TASK_FAIL,
                })

                dispatch(setAlert(
                    "No se pudo crear la tarea", "danger"
                ))
            }

        }catch(err){
            dispatch({
                type: CREATE_TASK_FAIL
            })
        }
    
    }
    
}

export const update_task = (id, title, description) => async dispatch => {
    if(document.cookie.includes("Authorization")){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        
        const body = JSON.stringify({title, description})

        try {

            const res = await axios.put(`http://localhost:5000/api/task/update/${id}`, body, config)
            console.log(res)
            if(res.status === 200){
                
                dispatch({
                    type: UPDATE_TASK_SUCCESS,
                    payload: res.data
                })
                
                dispatch(
                    setAlert("Tarea editada con exito", "success"))
            }else{
                
                dispatch({
                    type: UPDATE_TASK_FAIL,
                })

                dispatch(setAlert(
                    "No se pudo crear la tarea", "danger"
                ))
            }

        }catch(err){
            dispatch({
                type: UPDATE_TASK_FAIL
            })
        }
    
    }
}

export const get_tasks = () => async dispatch => {
    if(document.cookie.includes("Authorization")){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        try{
            
            const res = await axios.get(`http://localhost:5000/api/tasks`, config)

            if(res.status === 200){
                dispatch({
                    type: GET_TASKS_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: GET_TASKS_FAIL
                })
            }
        

        }catch(err){
            dispatch({
                type: GET_TASKS_FAIL
            })
        }

    }
}

export const get_task = (id) => async dispatch => {
    
    if(document.cookie.includes("Authorization")){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        try{
            
            const res = await axios.get(`http://localhost:5000/api/task/${id}`, config)
            if(res.status === 200){
                console.log("GET_TASK_SUCCESS payload:", res.data)
                dispatch({
                    type: GET_TASK_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: GET_TASK_FAIL
                })
            }
            

        }catch(err){
            dispatch({
                type: GET_TASK_FAIL
            })
        }

    }
}


export const delete_task = (id) => async dispatch => {
    if(document.cookie.includes("Authorization")){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        try{
            
            const res = await axios.delete(`http://localhost:5000/api/task/${id}`, config)

            if(res.status === 204){
                
                dispatch({
                    type: DELETE_TASK_SUCCESS,
                    payload: res.data
                })

                dispatch(setAlert(
                    "Tarea eliminada con exito", "success"
                ))
            }else{
                
                dispatch({
                    type: DELETE_TASK_FAIL
                })

                dispatch(setAlert(
                    "No se pudo eliminar la tarea", "danger"
                ))
            }
        

        }catch(err){
            dispatch({
                type: DELETE_TASK_FAIL
            })
        }

    }
}