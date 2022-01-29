const searchForm = {
    searchFormArray : []
}


const searchFormOk = 'searchFormOk'


export default function SearchFormReducer (state = searchForm, action){
    switch(action.type){
        case searchFormOk:
            return{...state, searchFormArray: action.payload}
        default:
            return state
    }
}


export const SearchFormAction = (newSearch) => (dispatch) =>{
    dispatch({
        type:  searchFormOk,
        payload: newSearch
    })
}