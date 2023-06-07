import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

import { AuthService, usernameAvailability } from './auth.service';
import { ApiAuthToken, NewUser } from './auth.models';

describe('AuthServiceService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should make an Http Post request to the checkusername endpoint when checkUsernameAvialability is called', () => {
    const dummyResponse: usernameAvailability = {
      username_available: true
    };

    const username = 'username';

    service.checkUserNameAvailability(username)
      .subscribe({
        next: () => { return }
      });

    const requestWrapper = httpTestingController.expectOne({ url: `${environment.apiURL}users/checkusername` });
    requestWrapper.flush(dummyResponse);

    expect(requestWrapper.request.method).toBe('POST');
    expect(requestWrapper.request.body).toEqual({
      username: username
    });
  });

  it('should return a number less than the expiry date when expiryDateToTime is called', () => {
    const timePeriod = 10000;
    const date = Date.now() + timePeriod;
    expect(service.expiryDateToTime(date)).toBeLessThanOrEqual(timePeriod);
  });

  it('should return a number greater than the current date when expiryTimeToDate is called', () => {
    const timePeriod = 10000;
    expect(service.expiryTimeToDate(timePeriod)).toBeGreaterThan(Date.now());
  });

  it('Should make an Http Post request to the authenticate endpoint when login is called.', () => {
    const dummyResponse: ApiAuthToken = {
      userId: 'userId',
      idToken: 'idToken',
      expiresIn: 1
    };

    const user = {
      username: 'username',
      password: 'passwerd'
    }

    service.login(user)
      .subscribe({
        next: () => { return }
      });

    const requestWrapper = httpTestingController.expectOne({ url: `${environment.apiURL}users/authenticate` });
    requestWrapper.flush(dummyResponse);

    expect(requestWrapper.request.method).toBe('POST');
    expect(requestWrapper.request.body).toEqual({
      ...user
    });
  });

  it('Should make an Http Post request to the register endpoint when login is called.', () => {
    const newUser: NewUser = {
      id: null,
      auth_level: 1,
      first_name: 'first',
      last_name: 'last',
      username: 'username',
      password: 'password'
    };

    service.register(newUser)
      .subscribe({
        next: () => { return }
      });

    const requestWrapper = httpTestingController.expectOne({ url: `${environment.apiURL}users/register` });
    requestWrapper.flush(newUser);

    expect(requestWrapper.request.method).toBe('POST');
    expect(requestWrapper.request.body).toEqual({
      ...newUser
    });
  });

});
