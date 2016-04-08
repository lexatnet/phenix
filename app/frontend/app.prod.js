import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'containers/App.js';
import configureStore from 'store/configureStore';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
