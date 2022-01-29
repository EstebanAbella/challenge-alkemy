//constantes

const cartMenu = {
    menuCart : [],
    msjRecipesInMenu: []
}

//types

const addRecipesOk = 'addRecipesOk'

const deleteRecipesOk = 'deleteRecipesOk'

const emptyArrayOk = 'emptyArrayOk'

//reduces

export default function NewMenuReducer( state = cartMenu, action){
    switch(action.type){
        case addRecipesOk:
            var agregarFavo = state.menuCart.filter(nam => nam === action.payload)
            if(Object.keys(agregarFavo).length === 0 && state.menuCart.length < 4){

                var menuVeganMenuCartFalse = state.menuCart.filter(veg => veg.vegan === false)
                var menuVeganMenuCartTrue = state.menuCart.filter(veg => veg.vegan === true)
                if(Object.keys(menuVeganMenuCartFalse).length === 2 && action.payload.vegan === false ||
                    Object.keys(menuVeganMenuCartTrue).length === 2 && action.payload.vegan === true){
                    return{...state, msjRecipesInMenu: 'You must enter two vegan menus and two that are not'}
                }else{
                    return {...state, menuCart: state.menuCart.concat(action.payload), msjRecipesInMenu:'Add menu'}
                }


            }else{
                return {...state, msjRecipesInMenu: 'No more than four menus are allowed, and they must not be repeated'}
            }

        case deleteRecipesOk:
            return {...state, menuCart: state.menuCart.filter(d => d.id !== action.payload)}

        case emptyArrayOk:
            return{...state, msjRecipesInMenu: action.payload}

        default:
            return state
    }

}

//actions

export const NewMenuAction = (addRecipes) => (dispatch) =>{
    dispatch({
        type: addRecipesOk,
        payload: addRecipes
    })
}

export const DeleteMenuAction = (deleteRecipes) => (dispatch) =>{
    dispatch({
        type: deleteRecipesOk,
        payload: deleteRecipes
    })
}

export const EmptyArrayAction = (emptyArray) => (dispatch)=>{
    dispatch({
        type: emptyArrayOk,
        payload: emptyArray
    })
}