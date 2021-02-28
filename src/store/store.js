import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducers from './reducers/authReducers'
import globalReducers from './reducers/globalReducers'
import appReducers from './reducers/appReducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    authReducers: authReducers,
    appReducers: appReducers,
    globalReducers: globalReducers
})


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['globalReducers']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store)


export default { store, persistor };