import {createAction, props} from '@ngrx/store';
import {User} from '../../../core/models/user';
import {Credentials} from '../../../core/models/credentials';

export const checkAuthStatus = createAction('[App Component] Check Auth Status]');
export const checkAuthStatusSuccess = createAction('[API User] Check Auth Status Success',
  props<{ user: User }>());
export const checkAuthStatusFailure = createAction('[App Component] Check Auth Status Failure',
  props<{ error: string }>());

export const login = createAction('[Login Component] Login Action',
  props<{ credentials: Credentials }>());
export const loginSuccess = createAction('[API User] Login Success',
  props<{ user: User }>());
export const loginFailure = createAction('[Login Component] Login Failure',
  props<{ error: string }>());

export const logout = createAction('[Header Component] Logout Action');
export const logoutSuccess = createAction('[API User] Logout Action Success');
export const logoutFailure = createAction('[API User] Logout Action Failure',
  props<{ error: string }>());
