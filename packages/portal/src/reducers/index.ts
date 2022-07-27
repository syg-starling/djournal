import { combineReducers, Reducer as ReduxReducer } from "redux"
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { PersistPartial } from "redux-persist/es/persistReducer"

import journal from "./journalSlice"
import user, { persistConfig as userPersistConfig } from "./userSlice"
import journalReview from './journalReviewSlice'

const persisted = <T>(reducer: ReduxReducer<T>, persistConfig: Reducer.PersistConfig<T>): ReduxReducer<T & PersistPartial> => {
  return persistReducer({ ...persistConfig, storage }, reducer)
}

const rootReducer = combineReducers({
  journal,
  user: persisted(user, userPersistConfig),
  journalReview,
})

export default rootReducer
