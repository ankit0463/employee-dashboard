import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeeApi = environment.apiURL + '/api/employee';
  constructor(private httpClient: HttpClient) {}

  getAll(query?, params?: string) {
    let api = this.employeeApi;
    if (query !== undefined && query !== '') {
      api += '?q=' + query;
    }
    return this.httpClient.get(api);
  }
}
