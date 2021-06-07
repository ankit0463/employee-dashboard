import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromActions from './store/actions/login.action';
import * as fromReducer from './store/reducers/login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pending = this.store.select(fromReducer.getLoading);
  errorMessage = this.store.select(fromReducer.getError);

  form: FormGroup;

  constructor(private store: Store) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit() {
    const credentials = this.form.value;
    this.store.dispatch(fromActions.login({ credentials }));
  }

}
