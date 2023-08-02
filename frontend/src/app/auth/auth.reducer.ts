import {
  createReducer,
  on
} from '@ngrx/store';

import { AuthState } from './auth.models';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  usernameAvailable: true,
  authUser: {
    username: null,
    token: null,
  },
  status: 'pending'
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.login,
    AuthActions.autoLogin,
    (state): AuthState => {
      return {
        ...state,
        status: 'loading'
      };
    }
  ),
  on(
    AuthActions.autoLoginSuccess,
    (state, action): AuthState => {
      return {
        ...state,
        authUser: {
          ...state.authUser,
          username: action.userData.username,
          token: action.userData.token,
        },
        status: 'success'
      };
    }
  ),
  on(
    AuthActions.autoLoginFailure,
    (state): AuthState => {
      return {
        ...state,
        authUser: {
          username: null,
          token: null
        },
        status: 'pending'
      }
    }
  ),
  on(
    AuthActions.apiLoginSuccess,
    (state, action): AuthState => {
      return {
        ...state,
        authUser: {
          ...state.authUser,
          username: action.username,
          token: action.token,
        },
        status: 'success'
      };
    }
  ),
  on(
    AuthActions.apiLoginFailure,
    (state): AuthState => {
      return {
        ...state,
        authUser: {
          ...state.authUser,
          username: null,
          token: null,
        },
        status: 'error'
      };
    }
  ),
  on(
    AuthActions.logout,
    AuthActions.autoLogout,
    (state): AuthState => {
      return {
        ...state,
        authUser: {
          ...state.authUser,
          username: null,
          token: null,
        },
        status: 'pending'
      };
    }
  ),
  on(
    AuthActions.apiSetUsernameAvailable,
    (state): AuthState => {
      return {
        ...state,
        usernameAvailable: true
      }
    }
  ),
  on(
    AuthActions.apiClearUsernameAvailable,
    (state): AuthState => {
      return {
        ...state,
        usernameAvailable: false
      }
    }
  )
);
