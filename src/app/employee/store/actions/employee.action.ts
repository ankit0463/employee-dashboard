import { createAction, props } from '@ngrx/store';

export const loadEmployee = createAction('[Employee] Load Employee');

export const searchEmployee = createAction(
  '[Employee] Search Employee',
  props<{ query: string }>()
);

export const searchSuccess = createAction(
  '[Employee] Search Success',
  props<{ data: any }>()
);

export const searchFailure = createAction(
  '[Employee] Search Failure',
  props<{ errorMsg: string }>()
);

