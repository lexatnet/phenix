import {
  CSRF_TOKEN_SUCCESS
} from 'actions/api'


export function login(state, action) { // <------ 'login' is name of form given to reduxForm()
  console.log('formPlugin()', state, action);
  switch (action.type) {
    case CSRF_TOKEN_SUCCESS:
      return {
        ...state,
         csrf:{
           value:action.payload.csrf
         }
      };
    default:
      return state;
  }
}
