import { applyMiddleware, createStore, compose, Store } from 'redux';
import rootReducers from 'reducers';
import reduxThunk from 'redux-thunk';

const isReduxDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

let store: Store;
if (process.env.NODE_ENV === 'production' || !isReduxDevtools) {
  store = createStore(rootReducers, applyMiddleware(reduxThunk));
} else {
  store = createStore(
    rootReducers,
    compose(
      applyMiddleware(reduxThunk),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default store;
