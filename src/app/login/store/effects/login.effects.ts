import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as fromActions from '../actions/login.action';
import { LoginService } from '../../../services/login.service';
import { LogoutComponent } from '../../../components/logout/logout.component';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.login),
      map((action) => action.credentials),
      exhaustMap((auth) =>
        this.loginService.login(auth).pipe(
          map((isLoggedIn) =>
            fromActions.loginSuccess({ isLoggedIn }
          )),
          catchError((error) =>
            of(fromActions.loginFailure({ error: (error.error && error.error.message) ? error.error.message :
              typeof error === 'string' ? error : 'Error while login. Please try again' })
          ))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.logout),
        tap((authed) => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
