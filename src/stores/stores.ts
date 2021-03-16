import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../reducers/index'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'dataReducer'
  ],
  blacklist: []
} // Middleware: Redux Persist Persisted Reducer

const persistedReducer = persistReducer(persistConfig, rootReducer) // Redux: Store
const store = createStore(persistedReducer, applyMiddleware(createLogger())) // Middleware: Redux Persist Persister

const persister = persistStore(store)
export { store, persister }
