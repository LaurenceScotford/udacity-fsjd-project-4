import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from '../auth.models';
import * as AuthActions from '../auth.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname = '';
  pword = '';
  fname = '';
  lname = '';
  runame = '';
  rpword = '';
  uname_available = true;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  onSubmitLogin() {
    const user: User = {
      username: this.uname,
      password: this.pword
    }

    this.store.dispatch(AuthActions.login({ userData: user }));
  }
}
