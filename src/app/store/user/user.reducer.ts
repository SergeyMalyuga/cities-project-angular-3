import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {
  checkAuthStatus,
  checkAuthStatusFailure,
  checkAuthStatusSuccess,
  login,
  loginFailure,
  loginSuccess, logout, logoutFailure, logoutSuccess
} from './actions/user.actions';

const initialState: UserState = {
  user: DEFAULT_USER,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isLoading: false,
  error: null,
};

export const userReducer = createReducer(initialState,
  //Authorization
  on(login, state => ({
    ...state, isLoading: true
  })),
  on(loginSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.AUTH, isLoading: false, error: null
  })),
  on(loginFailure, (state, {error}) => ({
    ...state, authorizationStatus: AuthorizationStatus.UN_AUTH, isLoading: false, error
  })),

  //CheckAuth
  on(checkAuthStatus, state => ({
    ...state, isLoading: true
  })),
  on(checkAuthStatusSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.AUTH, isLoading: false, error: null
  })),
  on(checkAuthStatusFailure, (state, {error}) => ({
    ...state, authorizationStatus: AuthorizationStatus.UN_AUTH, isLoading: false, error
  })),

  //Logout
  on(logout, state => ({
    ...state, isLoading: true
  })),
  on(logoutSuccess, state => ({
    ...state, user: DEFAULT_USER, authorizationStatus: AuthorizationStatus.UN_AUTH, isLoading: false, error: null
  })),
  on(logoutFailure, (state, {error}) => ({
    ...state, isLoading: false, error
  }))
);
