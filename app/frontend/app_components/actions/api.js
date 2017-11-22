import {
  RSAA
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
    [RSAA]: {
      endpoint: '/api/user/login',
      method: 'POST',
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      headers: {
        Accept: 'application/json'
      },
      body: formData,
      credentials:'same-origin',
    },
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function logout(csrf) {
  let formData = new FormData();
  formData.append('csrf', csrf);
  return {
    [RSAA]: {
      endpoint: '/api/user/logout',
      method: 'POST',
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      headers: {
        Accept: 'application/json'
      },
      body: formData,
      credentials:'same-origin',
    },
  };
}


export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';
export function getCurrentUser() {
  return {
    [RSAA]: {
      endpoint: '/api/user/profile/current',
      method: 'GET',
      types: [GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILURE],
      credentials:'same-origin',
    },
  };
}

export const CSRF_TOKEN_REQUEST = 'CSRF_TOKEN_REQUEST';
export const CSRF_TOKEN_SUCCESS = 'CSRF_TOKEN_SUCCESS';
export const CSRF_TOKEN_FAILURE = 'CSRF_TOKEN_FAILURE';
export function getCSRFToken() {
  return {
    [RSAA]: {
      endpoint: '/api/csrf-token',
      method: 'GET',
      types: [CSRF_TOKEN_REQUEST, CSRF_TOKEN_SUCCESS, CSRF_TOKEN_FAILURE],
      credentials:'same-origin',
    },
  };
}
