import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import DevTools from 'containers/DevTools';
import { persistState } from 'redux-devtools';
import { apiMiddleware } from 'redux-api-middleware';
import combineActionsMiddleware from 'redux-combine-actions';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

// import {cookie} from 'redux-effects-cookie'

const enhancer = compose(

  // Middleware you want to use in development:
  applyMiddleware(
    thunk,
    combineActionsMiddleware,
    apiMiddleware,
    routerMiddleware(history)
  ),

  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

//Setting up react-redux router
function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

export {
  history
};

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer(history),
    initialState,
    enhancer
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
