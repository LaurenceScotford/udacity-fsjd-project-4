import { createAction, props } from '@ngrx/store';
import { AuthInfo, LocalAuthToken, NewUser, User } from './auth.models';

const key = '[auth]';

export const checkUserNameAvailability = createAction(
    `${key} Check Username Availability`,
    props<{
        username: string,
    }>()
);

export const register = createAction(
    `${key} Register`,
    props<{ userData: NewUser }>()
);

export const login = createAction(
    `${key} Login`,
    props<{ userData: User }>()
);

export const autoLogin = createAction(`${key} Auto Login`);

export const autoLoginSuccess = createAction(
    `${key} Auto Login Success`,
    props<{ userData: AuthInfo }>()
);

export const autoLoginFailure = createAction(`${key} Auto Login Failure`);

export const autoLogout = createAction(`${key} Auto Logout`);


export const logout = createAction(`${key} Logout`);

export const apiUsernameAvailable = createAction(
    `${key} API Username Available`,
    props<{ userData: NewUser }>()
);

export const apiUsernameUnavailable = createAction(`${key} API Username Unavailable`);
export const apiUsernameFailure = createAction(`${key} API Username Failure`);

export const apiRegisterSuccess = createAction(`${key} API Register Success`);
export const apiRegisterFailure = createAction(`${key} API Register Failure`);

export const apiLoginSuccess = createAction(
    `${key} API Login Success`,
    props<{
        userId: string,
        username: string,
        token: LocalAuthToken
    }>()
);

export const apiLoginFailure = createAction(`${key} API Login Failure`);
export const apiLoginUnauthorised = createAction(`${key} API Login Unauthorised`);

export const apiSetUsernameAvailable = createAction(`${key} API Set Username Available`);
export const apiClearUsernameAvailable = createAction(`${key} API Clear Username Available`);