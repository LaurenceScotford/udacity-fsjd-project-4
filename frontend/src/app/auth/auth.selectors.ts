import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.models';

// export const selectAuth = (state: AppState) => state.auth;
export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuth,
    (state: AuthState) => state.authUser.username
);

export const selectToken = createSelector(
    selectAuth,
    (state: AuthState) => state.authUser.token
);

export const selectAuthToken = createSelector(
    selectToken,
    token => token?.idToken
)

export const selectIsLoggedIn = createSelector(
    selectUser,
    selectToken,
    (user, token) => { return token !== null && user !== null; }
);

export const selectUsernameAvailable = createSelector(
    selectAuth,
    (state: AuthState) => state.usernameAvailable
);