import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { apiMiddleware } from 'redux-api-middleware';
import combineActionsMiddleware from 'redux-combine-actions';

const enhancer = applyMiddleware(
    thunk,
    combineActionsMiddleware,
    apiMiddleware,
    routerMiddleware
  );

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
