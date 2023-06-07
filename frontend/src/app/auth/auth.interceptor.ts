import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthToken } from './auth.selectors';
import { from, map, take, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handleRequest(req, next));
  }

  async handleRequest(req: HttpRequest<any>, next: HttpHandler) {
    let authToken: string | undefined;

    await lastValueFrom(this.store.select(selectAuthToken).pipe(
      take(1),
      map(token => authToken = token)
    ));

    // If a jwt is present attach it to outgoing request
    if (authToken) {
      const authorisedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return await lastValueFrom(next.handle(authorisedRequest));
    }

    // Otherwise just send the request without an Authorization header
    return await lastValueFrom(next.handle(req));
  }
}