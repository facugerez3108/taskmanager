import { SIGNIN_SUCCES, SIGNIN_FAIL, SIGNUP_SUCCES, SIGNUP_FAIL, AUTHENTICATED_SUCCESS, 
    AUTHENTICATED_FAIL, SET_AUTH_LOADING, REMOVE_AUTH_LOADING, ACTIVATION_SUCCESS, ACTIVATION_FAIL, LOGOUT, USER_LOAD_SUCCESS,
     USER_LOAD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_CONFIRM_FAIL, REFRESH_SUCCESS, REFRESH_FAIL} from "./types"
import axios from "axios"
import Cookies from "js-cookie"
import { setAlert } from "./alert"


export const check_authenticated = () => async dispatch => {
    if(document.cookie.includes("Authorization")){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        
        const body = JSON.stringify({token: Cookies.get('Authorization')})

        try {
            const res = await axios.post(`http://localhost:5000/api/authenticated`, body, config, )

            if (res.status === 200){
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                    payload: res.data
                })

            }else{
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }

        }catch(err){

            dispatch({
                type: AUTHENTICATED_FAIL
            })

        }
    }else{
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }

}

export const activate = (uid, token) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token})

    try{

        const res = await axios.post(`http://localhost:5000/api/activate`, body, config)

        if(res.status === 200){
            dispatch({
                type: ACTIVATION_SUCCESS,
                payload: res.data
            })
            dispatch(
                setAlert("Cuenta activada con éxito", "success")
            )
        }else{
            dispatch({
                type: ACTIVATION_FAIL
            })
            dispatch(
                setAlert("Error al activar la cuenta, intente nuevamente", "danger")
            )
        }

        dispatch({
            type: REMOVE_AUTH_LOADING
        })


    }catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(
            setAlert("Error al conectar con el servidor, intente nuevamente", "danger")
        )
    }
}

export const load_user = () => async dispatch => { 
    const token = Cookies.get('Authorization')

    if(token){

        const config = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try{

            const res = await axios.get(`http://localhost:5000/api/user/me`, config)

            if(res.status === 200){
                dispatch({
                    type: USER_LOAD_SUCCESS,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: USER_LOAD_FAIL
                })
            }

            dispatch({
                type: REMOVE_AUTH_LOADING
            })


        }catch(err){
            dispatch({
                type: USER_LOAD_FAIL
            })
        }

    }else{
        dispatch({
            type: USER_LOAD_FAIL
        })
    }
}
 
export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }

    const body = JSON.stringify({email})

    try{    

        const res = await axios.post('http://localhost:5000/api/forgot-password', body, config)

        if(res.status === 204){
            dispatch({
                type: RESET_PASSWORD_SUCCESS
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(
                setAlert("Se ha enviado un correo para restablecer su contraseña", "success")
            )
        }else{
            dispatch({
                type: RESET_PASSWORD_FAIL
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(
                setAlert("Error al enviar el correo, intente nuevamente", "danger")
            )
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        })

    }catch(err){
        dispatch({
            type: RESET_PASSWORD_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(
            setAlert("Error al conectar con el servidor, intente nuevamente", "danger")
        )
    }
}

export const reset_password_confirm = (token, password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }

    const body = JSON.stringify({token, password})


    try{
        const res = await axios.post(`http://localhost:5000/api/reset-password/${token}`, body, config)
        if(res.status === 204){
            dispatch({
                type: RESET_PASSWORD_SUCCESS
            })
            dispatch({
                REMOVE_AUTH_LOADING
            })
            dispatch(
                setAlert("Contraseña restablecida con éxito", "success")
            )
        }else{
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(
                setAlert("Error al restablecer la contraseña, intente nuevamente", "danger")
            )
        }
    }catch(err){
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(
            setAlert('Hubbo un error al restablecer la contraseña, vuelva a intentarlo', 'danger')
        )
    }
    
}

export const signup = (username, email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username, email, password})

    try{

        const res = await axios.post('http://localhost:5000/api/signup', body, config, {
            credenials: 'include'
        })
        
        if(res.status === 201){
            dispatch({
                type: SIGNUP_SUCCES,
                payload: res.data
            })
            dispatch(
                setAlert("Cuenta creada con éxito", "success")
            )
        }else{
            dispatch({
                type: SIGNUP_FAIL
            })
            dispatch(
                setAlert("Error al crear la cuenta, intente nuevamente", "danger")
            )
        }

    }

    catch(err){
        dispatch({
            type: SIGNUP_FAIL
        })
    }
} 

export const signin = (email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }

    const body = JSON.stringify({email, password})

    try{

        const res = await axios.post(`http://localhost:5000/api/signin`, body, config)

        console.log(res)
        console.log(document.cookie)
        
        if(res.status === 200){
            dispatch({
                type: SIGNIN_SUCCES,
                payload: res.data
            })
            dispatch(
                setAlert("Inicio de sesión exitoso", "success")
            )
        }else{
            dispatch({
                type: SIGNIN_FAIL
            })
            dispatch(
                setAlert("Error al iniciar sesión, intente nuevamente", "danger")
            )
        }
    }

    catch(err){
        dispatch({
            type: SIGNIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    dispatch(setAlert("Sesión cerrada con éxito", "success"))
}
