import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import * as fromActions from './store/actions/employee.action';
import * as fromReducers from './store/reducers/employee.reducer';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  searchQuery: Observable<any>;
  error: Observable<any>;
  loading: Observable<any>;
  employeeData: Observable<any>;

  constructor(private store: Store<fromReducers.State>) {
    this.searchQuery = this.store.select(fromReducers.getSearchCriteria);
    this.employeeData = this.store.select(fromReducers.getSearchResults);
    this.loading = this.store.select(fromReducers.getLoading);
    this.error = this.store.select(fromReducers.getError);
  }

  ngOnInit() {
    this.employeeData.pipe(first()).subscribe(data => {
      this.searchQuery.subscribe(query => {
        if (!(data && data.length) && (query === undefined || query === '' || query === null)) {
          this.store.dispatch(fromActions.loadEmployee());
        }
      })

    });
  }

  search(query: string) {
    this.store.dispatch(fromActions.searchEmployee({ query }));
  }

}
