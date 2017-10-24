import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {login} from './form';
import {user} from './user';

const rootReducer = combineReducers(
  Object.assign(
    {
      user
    },
    {
      routing: routerReducer
    },{
      form: formReducer.plugin({
        login
      })
    }
  )
);

export default rootReducer
