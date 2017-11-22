import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from 'actions/api'

export function app(state = {}, action) {
  console.log('reducer.app', state, action);
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return {
        redirect:'/'
      };
    default:
      return state;
  }
}
