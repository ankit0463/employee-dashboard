import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: any }>()
);

export const loginSuccess = createAction(
  '[API] Login Success',
  props<{ isLoggedIn: any }>()
);

export const loginFailure = createAction(
  '[API] Login Failure',
  props<{ error: any }>()
);

export const loginRedirect = createAction('[API] Login Redirect');

export const logout = createAction('[API] Logout');


