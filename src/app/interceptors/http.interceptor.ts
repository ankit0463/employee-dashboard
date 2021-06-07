import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import * as fromActions from '../login/store/actions/login.action';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  public pendingRequests: Array<string> = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });

    return next.handle(httpRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.url.indexOf('/login') !== -1) {
            localStorage.setItem('jwtToken', event.body.token);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.router.navigate(['login']).then(() => {
            this.toastr.error('Session Timeout');
            this.store.dispatch(fromActions.logout());

            // this.toastr.error('Session Timeout');
          // });
        }
        return throwError(error);
      })
    );
  }
}
