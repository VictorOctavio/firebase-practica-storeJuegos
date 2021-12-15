import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

//reducers
import adminReducer from './adminDucks'
import loginReducer, {readUserAction} from './loginDucks'

const rootReducer = combineReducers({
    productos: adminReducer,
    usuario: loginReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    readUserAction()(store.dispatch)
    return store;
}
