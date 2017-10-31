import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from 'containers/App.js';
import {Route} from 'react-router';
import configureStore from 'store/configureStore';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import DevTools from 'containers/DevTools';
import LoginPage from 'components/LoginPage/LoginPage.js';
import HomePage from 'components/HomePage/HomePage.js';

const store = configureStore();
const history = createHistory();

render(
  <Provider store={store}>
    <div>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
        </div>
      </ConnectedRouter>

      <div className='redux-dev-tools'>
        <DevTools/>
      </div>

    </div>
  </Provider>,
  document.getElementById('root')
);
