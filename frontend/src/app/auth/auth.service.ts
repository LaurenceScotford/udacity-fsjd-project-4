import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiAuthToken, NewUser, User } from './auth.models';
import { LocalStorageService } from '../services/local-storage.service';

export interface usernameAvailability {
  username_available: Boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private checkUsernameUrl = `${environment.apiURL}users/checkusername`;
  private registerUrl = `${environment.apiURL}users/register`;
  private authenticateUrl = `${environment.apiURL}users/authenticate`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  // Queries the server to check if a given username is available for use
  checkUserNameAvailability(username: string): Observable<usernameAvailability> {
    return this.http.post<usernameAvailability>(this.checkUsernameUrl, { username: username });
  }

  // Convert expiry date to time
  expiryDateToTime(expiryDate: number) {
    return expiryDate - Date.now();
  }

  // Convert time to expiry date
  expiryTimeToDate(expiryTime: number) {
    return Date.now() + expiryTime;
  }

  // Attempts to login a user
  login(user: User): Observable<ApiAuthToken> {
    return this.http.post<ApiAuthToken>(this.authenticateUrl, user);
  }

  // Attempts to register a new user on the service
  register(user: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(this.registerUrl, user);
  }

  // Get id of current user
  getUserId(): string {
    return this.localStorageService.get('auth', 'userId');
  }
}
