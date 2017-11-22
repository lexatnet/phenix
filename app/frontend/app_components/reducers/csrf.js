import {
  CSRF_TOKEN_SUCCESS
} from 'actions/api'
import { get } from 'lodash';


export function csrf(state = {}, action) {
  switch (action.type) {
    case CSRF_TOKEN_SUCCESS:
      return {
        value:get(action, 'payload.csrf')
      };
    default:
      return state;
  }
}
