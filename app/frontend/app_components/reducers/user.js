import {
  LOGIN_SUCCESS
} from 'actions/api'

export function user(state, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      
    };
  default:
    return state;
  }
}
