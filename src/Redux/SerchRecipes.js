//Constante

const serchRecipes = {
    resultSerchRecipes : []
}

//Type

const ResultSerchRecipesOk = 'ResultSerchRecipesOk'

//Reducer

export default function ResultSerchRecipesReducer (state = serchRecipes, action ) {
    switch(action.type){
        case ResultSerchRecipesOk:
            return{...state, resultSerchRecipes: action.payload}
        default:
            return state
    }
}

//Action

export const ResultSerchRecipesAction = (serch) => (dispatch) =>{
    dispatch({
        type: ResultSerchRecipesOk,
        payload: serch
    })
}
