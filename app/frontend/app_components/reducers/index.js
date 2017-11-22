import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {app} from './app';
import {csrf} from './csrf';
import {user} from './user';

const rootReducer = combineReducers(
  Object.assign(
    {
      app
    },
    {
      user
    },
    {
      csrf
    },
    {
      routing: routerReducer
    },
    {
      form: formReducer.plugin({})
    }
  )
);

export default rootReducer;
