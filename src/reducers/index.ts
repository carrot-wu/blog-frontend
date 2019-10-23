import articleReducer from "./article"
import {combineReducers} from 'redux'
const rootReducers = combineReducers({
  article: articleReducer
})
export type AppState = ReturnType<typeof rootReducers>
export default rootReducers

