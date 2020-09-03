import articleReducer from './article';
import tagReducer from './tag';
import { combineReducers } from 'redux';
const rootReducers = combineReducers({
  article: articleReducer,
  tag: tagReducer
});
export type AppState = ReturnType<typeof rootReducers>;
export default rootReducers;
