import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, debounceTime, exhaustMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AuthInfo, authLocalStorageName } from "./auth.models";
import { AuthService } from "./auth.service";
import * as fromActions from './auth.actions';
import { setMessage } from "../message/message.actions";
import { LocalStorageService } from '../services/local-storage.service';

const AUTOLOGIN_MIN_TIME = 1000 * 60 * 60;  // 1000ms (1 sec) * 60 seconds * 60 mins = 1 hour

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private store: Store
    ) { }

    private removeAuthStorage() {
        const timer = this.localStorageService.get(authLocalStorageName, 'timer');
        if (timer) {
            clearTimeout(timer);
        }
        this.localStorageService.remove(authLocalStorageName);
    }

    login$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.login),
        tap(() => console.log('Create effect ran!')),
        exhaustMap((action) => this.authService.login(action.userData)
            .pipe(
                map(authToken => fromActions.apiLoginSuccess({
                    userId: authToken.userId,
                    username: action.userData.username,
                    token: {
                        idToken: authToken.idToken,
                        expiresAt: this.authService.expiryTimeToDate(authToken.expiresIn)
                    }
                })
                ),
                catchError((err) => {
                    if (err.status === 401) {
                        return of(fromActions.apiLoginUnauthorised());
                    } else {
                        return of(fromActions.apiLoginFailure());
                    }
                })
            )
        ))
    );

    autoLogin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.autoLogin),
        map(() => {
            const rehydratedAuth: AuthInfo | null =
                this.localStorageService.rehydrate(authLocalStorageName) as AuthInfo | null;

            if (rehydratedAuth && rehydratedAuth.token.expiresAt > Date.now() + AUTOLOGIN_MIN_TIME) {
                return fromActions.autoLoginSuccess({ userData: rehydratedAuth });
            } else {
                return fromActions.autoLoginFailure();
            }
        })
    ));

    loginFailure$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.apiLoginFailure),
        map(() => {
            return setMessage({
                message: 'Sorry! We were unable to log you in at this time! Please try again later...',
                messageType: 'warn'
            });
        })
    ));

    loginUnauthorised$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.apiLoginUnauthorised),
        map(() => {
            return setMessage({
                message: 'We didn\'t recognise your username and/or password! Please check they are correct and try again...',
                messageType: 'warn'
            });
        })
    ));

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.apiLoginSuccess),
        map((action) => {
            this.localStorageService.save(authLocalStorageName, {
                userId: action.userId,
                username: action.username,
                token: action.token,
                timer: setTimeout(() => this.store.dispatch(fromActions.autoLogout()), this.authService.expiryDateToTime(action.token.expiresAt))
            });
            this.router.navigate(['/product-list']);
            return setMessage({
                message: `You have been logged in as ${action.username}`,
                messageType: 'confirm'
            });
        })
    ));

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.logout),
        map(() => {
            this.removeAuthStorage();
            return setMessage({
                message: 'You have logged out.',
                messageType: 'confirm'
            })
        })
    ));

    autoLogout$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.autoLogout),
        map(() => {
            this.removeAuthStorage();
            return setMessage({
                message: 'Your session has ended and you have been logged out. Please login again...',
                messageType: 'warn'
            })
        })
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.register),
        exhaustMap((action) => this.authService.checkUserNameAvailability(action.userData.username)
            .pipe(
                map(outcome => {
                    if (outcome.username_available) {
                        return fromActions.apiUsernameAvailable({ userData: action.userData });
                    } else {
                        return fromActions.apiUsernameUnavailable();
                    }
                }),
                catchError(() => of(fromActions.apiUsernameFailure()))
            )
        )
    ));

    usernameUnavailable$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.apiUsernameUnavailable),
        map(() => {
            return setMessage({
                message: 'The username you selected is not available for use. Please enter a different username and try again...',
                messageType: 'warn'
            })
        })
    ));

    usernameAvailable$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.apiUsernameAvailable),
        exhaustMap(action => this.authService.register(action.userData)
            .pipe(
                map(() => { return fromActions.apiRegisterSuccess() }),
                catchError(() => of(fromActions.apiRegisterFailure()))
            )
        )
    ))

    registrationFailure$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.apiUsernameFailure,
            fromActions.apiRegisterFailure
        ),
        map(() => {
            return setMessage({
                message: 'Sorry, we\'re unable to complete your registration at this time. Please try again later...',
                messageType: 'warn'
            })
        })
    ));

    registrationSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.apiRegisterSuccess),
        map((action) => {
            this.router.navigate(['/login']);
            return setMessage({
                message: `You have registered successfully. Please login...`,
                messageType: 'confirm'
            });
        })
    ));

    checkUsernameAvailability$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.checkUserNameAvailability),
        debounceTime(250),
        exhaustMap((action) => this.authService.checkUserNameAvailability(action.username)
            .pipe(
                map(outcome => {
                    if (outcome.username_available) {
                        return fromActions.apiSetUsernameAvailable();
                    } else {
                        return fromActions.apiClearUsernameAvailable();
                    }
                }),
                catchError(() => of(fromActions.apiSetUsernameAvailable()))
            )
        )
    ));
}

