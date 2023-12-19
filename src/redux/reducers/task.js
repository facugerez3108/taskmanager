import {
    GET_TASKS_SUCCESS, GET_TASKS_FAIL, 
    GET_TASK_SUCCESS, GET_TASK_FAIL, 
    CREATE_TASK_SUCCESS, CREATE_TASK_FAIL, 
    DELETE_TASK_SUCCESS, DELETE_TASK_FAIL, 
    UPDATE_TASK_SUCCESS, UPDATE_TASK_FAIL 
} from '../actions/types'


const initalState = {
    task: [],
    tasks: [],
}

export default function Task (state = initalState, action) {
    const { type, payload } = action

    switch (type) {
        case CREATE_TASK_SUCCESS:
            return {
                ...state, 
                task: payload.task
            }
        case CREATE_TASK_FAIL:
            return {
                ...state,
                task: null,
            }
        case UPDATE_TASK_SUCCESS:
            console.log("update_task_success", payload.task)
            return {
                ...state,
                task: payload.task
            }
        case UPDATE_TASK_FAIL:
            return {
                ...state,
                task: null,
            }
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: payload
            }
        case GET_TASKS_FAIL:
            return {
                ...state,
                tasks: null,
            }
        case GET_TASK_SUCCESS:
            console.log("get_task_succes", payload)
            return {
                ...state,
                task: payload
            }
        case GET_TASK_FAIL:
            return {
                ...state,
                task: null
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                task: null,
            }
        case DELETE_TASK_FAIL:
            return {
                ...state,
                task: null
            }
        default: return state;
    }
}

