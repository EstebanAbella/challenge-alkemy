//constante

var userLogin = {
    token: JSON.parse(localStorage.getItem('token'))?[JSON.parse(localStorage.getItem('token'))]: []
}


//type

const NewUserLogin = 'NewUserLogin'
const CloseUserLogin = 'CloseUserLogin'

//reducer

export default function NewUserLoginReducer (state = userLogin, action){
    switch(action.type){
        case NewUserLogin:
            return{...state, token: action.payload}

        case CloseUserLogin:
            localStorage.removeItem('token')
            return {...state, token: []}

        default:
            return state
    }    
}


//action

export const NewUserLoginAction = (newToken) => (dispatch) =>{
    dispatch({
        type: NewUserLogin,
        payload: newToken
    })
}

export const CloseUserLoginAction = (closeUser) => (dispatch) =>{
    dispatch({
        type: CloseUserLogin,
        payload: closeUser
    })
}