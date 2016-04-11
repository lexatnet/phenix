import {
  CALL_API
} from 'redux-api-middleware';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(csrf, login, password) {
  let formData = new FormData();
  formData.append('csrf', csrf);
  formData.append('login', login);
  formData.append('password', password);
  return {
    [CALL_API]: {
      endpoint: '/api/user/login',
      method: 'POST',
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data;boundary=',
      },
      body: formData,
    },
  };
}

export const CSRF_TOKEN_REQUEST = 'CSRF_TOKEN_REQUEST';
export const CSRF_TOKEN_SUCCESS = 'CSRF_TOKEN_SUCCESS';
export const CSRF_TOKEN_FAILURE = 'CSRF_TOKEN_FAILURE';

export function getCSRFToken() {
  return {
    [CALL_API]: {
      endpoint: '/api/csrf-token',
      method: 'GET',
      types: [CSRF_TOKEN_REQUEST, CSRF_TOKEN_SUCCESS, CSRF_TOKEN_FAILURE],
    },
  };
}
