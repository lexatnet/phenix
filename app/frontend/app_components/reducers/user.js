import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_CURRENT_USER_SUCCESS
} from 'actions/api'
import { get } from 'lodash'

export function user(state = {}, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return get(action, 'payload.user', {});
  case LOGOUT_SUCCESS:
    return {};
  case GET_CURRENT_USER_SUCCESS:
    return get(action, 'payload.user', {});
  default:
    return state;
  }
}
