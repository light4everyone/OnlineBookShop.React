import { action, payload } from 'ts-action';
import { UserForLogin, login } from '../../api/account/login';
import { AsyncAction } from './_common';

export const loginUserSuccess =
  action('LOGIN_USER_SUCCESS', payload<{ token: string }>());

export const loginUserFailure = action('LOGIN_USER_FAILURE');

export const loginUserRequest = action('LOGIN_USER_REQUEST');

export const fetchCurrentUserFailure = action('FETCH_CURRENT_USER_FAILURE');

export const logoutUserSuccess = action('LOGOUT_USER');

export const loginUser = (form: UserForLogin): AsyncAction => async (dispatch) => {
  let token: string;

  try {
    dispatch(loginUserRequest());

    const { accessToken } = await login(form);
    token = accessToken;

    localStorage.setItem('token', token);
    dispatch(loginUserSuccess({ token }));
  } 
  catch {
    dispatch(loginUserFailure());
  }
  
}

export const logoutUser = (): AsyncAction => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutUserSuccess());
}

export const fetchCurrentUser = (): AsyncAction => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token != null) {
    dispatch(loginUserSuccess({ token }));
  } else {
    dispatch(fetchCurrentUserFailure());
  }
}

