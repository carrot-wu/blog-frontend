import {applyMiddleware, createStore} from 'redux'
import rootReducers from 'reducers'
import reduxThunk from 'redux-thunk'

const store = createStore(rootReducers, applyMiddleware(reduxThunk))

export default store
