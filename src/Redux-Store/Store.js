import { configureStore,combineReducers } from '@reduxjs/toolkit'
import HeaderReducer from './HeaderChange'
import PlayerReducer  from './PlayerChange'
import PlayListSlice from './playList'
import user from './user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

    
const reducers = combineReducers({
     header:HeaderReducer,
     player:PlayerReducer,
     playList:PlayListSlice,  
     user:user,  
})
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer:reducers,
    middleware: [thunk]
    
})
// export  const persistor = persistStore(store)

