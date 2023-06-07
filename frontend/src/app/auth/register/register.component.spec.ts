import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { cold } from 'jasmine-marbles';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to check username availability when onUsernameInput is called', () => {
    const username = 'username'
    component.runame = username;

    const expected = cold('a', {
      a: {
        type: '[auth] Check Username Availability',
        username: username
      }
    });

    component.onUsernameInput();

    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch an action to register when onRegister is called', () => {
    const firstName = 'First';
    const lastName = 'Last';
    const username = 'username';
    const password = 'password';

    component.fname = firstName;
    component.lname = lastName;
    component.runame = username;
    component.rpword = password;

    const expected = cold('a', {
      a: {
        type: '[auth] Register',
        userData: {
          id: null,
          auth_level: 1,
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password
        }
      }
    });

    component.onSubmitRegister();

    expect(store.scannedActions$).toBeObservable(expected);
  });
});
