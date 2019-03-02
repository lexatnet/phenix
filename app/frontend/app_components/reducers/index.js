import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { app } from './app';
import { csrf } from './csrf';
import { user } from './user';

export default (history) => combineReducers(
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
      router: connectRouter(history)
    },
    {
      form: formReducer.plugin({})
    }
  )
);
