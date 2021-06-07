import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginApi = environment.apiURL + '/api/login';
  constructor(private httpClient: HttpClient) {}

  isNullOrUndefined(value) {
    return value === null || value === undefined || value === '';
  }

  login(credentials) {
    if (
      this.isNullOrUndefined(credentials.username) ||
      this.isNullOrUndefined(credentials.password)
    ) {
      return throwError('Please enter credentials');
    }
    return this.httpClient.post(this.loginApi, credentials);

  }

  logout() {
    return of(true);
  }
}
