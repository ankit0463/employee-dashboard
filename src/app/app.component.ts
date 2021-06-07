import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import * as fromReducers from './login/store/reducers/login.reducer';
import * as fromActions from './login/store/actions/login.action';
import { LogoutComponent } from './components/logout/logout.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'employee-dashboard';
  showSideNav = false;
  navigateTo = '';
  isLoggedIn: any;

  constructor(private store: Store, private dialog: MatDialog) {
    this.isLoggedIn = this.store.select(fromReducers.getUserLogin);
  }

  ngOnInit() {}

  openSideNav() {
    this.showSideNav = true;
  }

  closeSideNav() {
    this.showSideNav = false;
  }

  logout() {
    this.showSideNav = false;

    const dialogRef =
      this.dialog.open<LogoutComponent, undefined, boolean>(LogoutComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(fromActions.logout());
        localStorage.removeItem('jwtToken');
      }
    });
  }
}
