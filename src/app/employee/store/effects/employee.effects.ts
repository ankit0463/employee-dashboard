import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import * as fromActions from '../actions/employee.action';
import { EmployeeService } from '../../../services/employee.service';

@Injectable()
export class EmployeeEffects {

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) { }

  search$ = createEffect(
    () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(fromActions.searchEmployee),
        debounceTime(debounce, scheduler),
        switchMap(({ query }) => {

          const nextSearch$ = this.actions$.pipe(
            ofType(fromActions.searchEmployee),
            skip(1)
          );
          return this.employeeService.getAll(query).pipe(
            takeUntil(nextSearch$),
            map((data) =>
              fromActions.searchSuccess({ data })
            ),
            catchError((error) =>
              of(fromActions.searchFailure({ errorMsg: error.error.message ? error.error.message : error.error }))
            )
          );
        })
      )
  );

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadEmployee),
      switchMap(() =>
      this.employeeService.getAll().pipe(
          map((data) =>
            fromActions.searchSuccess({ data })
          ),
          catchError((error) =>
            of(fromActions.searchFailure({ errorMsg: error.error.message ? error.error.message : error.error }))
          )
        )
      )
    )
  );
}
