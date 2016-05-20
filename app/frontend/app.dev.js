// import 'babel-polyfill'
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from 'containers/App.js';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from 'store/configureStore';
import DevTools from 'containers/DevTools';
import LoginPage from 'components/LoginPage/LoginPage.js';
import HomePage from 'components/HomePage/HomePage.js';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
  <div>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
      </Route>
    </Router>

    <div className='redux-dev-tools'>
      <DevTools/>
    </div>

  </div>
</Provider>, document.getElementById('root'));
