import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'


import NewUserLoginReducer from './LoginUser';
import ResultSerchRecipesReducer from './SerchRecipes'
import NewMenuReducer from './Menu'
import MsjDetailCartReducer from './MsjDetailCart'
import SearchFormReducer from './Search'


const rootReducer = combineReducers({
    NewUserLoginReducer : NewUserLoginReducer,
    ResultSerchRecipesReducer: ResultSerchRecipesReducer,
    NewMenuReducer: NewMenuReducer,
    MsjDetailCartReducer: MsjDetailCartReducer,
    SearchFormReducer : SearchFormReducer,
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function GenerateStore(){
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
    return store
}