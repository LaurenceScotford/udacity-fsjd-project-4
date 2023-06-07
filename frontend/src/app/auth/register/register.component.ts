import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { NewUser, User } from '../auth.models';
import * as AuthActions from '../auth.actions'
import { Subscription } from 'rxjs';
import { selectUsernameAvailable } from '../auth.selectors';

@Component({
  selector: 'app-login-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  uname = '';
  pword = '';
  fname = '';
  lname = '';
  runame = '';
  rpword = '';
  uname_available = true;
  userNameAvailableSub$: Subscription | null | undefined;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.userNameAvailableSub$ = this.store.select(selectUsernameAvailable)
      .subscribe(usernameAvailable => this.uname_available = usernameAvailable);
  }

  ngOnDestroy(): void {
    this.userNameAvailableSub$?.unsubscribe();
    this.userNameAvailableSub$ = null;
  }

  onUsernameInput() {
    this.store.dispatch(AuthActions.checkUserNameAvailability({ username: this.runame }));
  }

  onSubmitRegister() {
    const user: NewUser = {
      id: null,
      auth_level: 1,
      first_name: this.fname,
      last_name: this.lname,
      username: this.runame,
      password: this.rpword
    };
    this.store.dispatch(AuthActions.register({ userData: user }));
  }
}
