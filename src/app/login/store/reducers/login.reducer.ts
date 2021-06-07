import { createReducer, on, createFeatureSelector, createSelector, Action } from '@ngrx/store';
import * as fromActions from '../actions/login.action';

export const loginFeatureKey = 'auth';

export interface State {
  isLoggedIn: any;
  error: any;
  pending: any;
}

export const initialState: State = {
  isLoggedIn: false,
  error: null,
  pending: false,
};

export const loginReducer = createReducer(
  initialState,
  on(fromActions.login, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(fromActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
    isLoggedIn: false
  })),
  on(fromActions.loginSuccess, (state, { isLoggedIn }) => ({
     ...state,
     error: null,
     pending: false,
     isLoggedIn: true,
    })),
  on(fromActions.logout, () => initialState)
);

export const getState = createFeatureSelector<State>(
  loginFeatureKey,
);

export const getLoading = createSelector(
  getState,
  state => state && state.pending
);

export const getError = createSelector(
  getState,
  state => state && state.error
);


export const getUserLogin = createSelector(
  getState,
  state => state && state.isLoggedIn
);


export function reducer(state: State | undefined, action: Action): any {
    return loginReducer(state, action);
  }




