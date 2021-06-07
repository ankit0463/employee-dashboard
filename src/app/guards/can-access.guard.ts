import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromReducers from '../login/store/reducers/login.reducer';
import * as fromActions from '../login/store/actions/login.action';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromReducers.getUserLogin).pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.store.dispatch(fromActions.loginRedirect());
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
