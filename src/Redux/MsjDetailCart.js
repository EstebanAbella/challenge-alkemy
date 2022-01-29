const MsjDetailCart = {
    msjDetail:'noStyleDetailCart'
}


const setMsjDetailCart = 'addMsjDetailCart'




export default function MsjDetailCartReducer (state = MsjDetailCart, action){
    switch(action.type){
        case setMsjDetailCart:
            return{...state, msjDetail: action.payload}

        default:
            return state
    }    
}

export const MsjDetailCartAction = (setMsj) => (dispatch) =>{
    dispatch({
        type: setMsjDetailCart,
        payload: setMsj
    })
}