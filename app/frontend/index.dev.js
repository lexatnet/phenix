// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App.js'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import DevTools from './containers/DevTools';
import Test from './components/test/Test';
import Test0 from './components/test0/Test';


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
	  <div>
	    <Router history={history}>
	      <Route path="/" component={App}>
					<Route path="/login" component={LoginPage}/>
	      </Route>
	    </Router>
			<Test />
			<Test0 />

	    <div className='redux-dev-tools'>
				<DevTools />
			</div>


	  </div>
  </Provider>,
  document.getElementById('root')
)
