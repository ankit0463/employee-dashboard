import { createReducer, on, createFeatureSelector, createSelector, Action } from '@ngrx/store';
import * as fromActions from '../actions/employee.action';

export const employeeFeatureKey = 'employee';

export interface State {
  searchValue: any;
  data: any;
  error: any;
  pending: any;
  ids: any;
}

export const initialState: State = {
  searchValue: '',
  data: [],
  error: '',
  pending: false,
  ids: []
};

export const employeeReducer = createReducer(
  initialState,
  on(fromActions.loadEmployee, (state) => ({
    ...state,
    pending: true,
  })),
  on(fromActions.searchEmployee, (state, { query }) => ({
    ...state,
    pending: true,
    error: '',
    searchValue: query,
  })),
  on(fromActions.searchSuccess, (state, { data }) => ({
    ...state,
    ids: data.map((employee) => employee.userId),
    data,
    pending: false,
    error: '',
    searchValue: state.searchValue,
  })),
  on(fromActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    pending: false,
    error: errorMsg,
  }))
);

export const getState = createFeatureSelector<State>(
  employeeFeatureKey,
);

export const getIds = createSelector(
  getState,
  state => state.ids
);

export const getSearchCriteria = createSelector(
  getState,
  state => state.searchValue
);

export const getLoading = createSelector(
  getState,
  state => state.pending
);

export const getError = createSelector(
  getState,
  state => state.error
);

export const getSearchResults = createSelector(
  getState,
  state => state.data
);


export function reducer(state: State | undefined, action: Action): any {
    return employeeReducer(state, action);
  }




