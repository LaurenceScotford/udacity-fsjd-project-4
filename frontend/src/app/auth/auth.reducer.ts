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
    (state) => {
      return {
        ...state,
        status: 'loading'
      };
    }
  ),
  on(
    AuthActions.autoLoginSuccess,
    (state, action) => {
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
    (state) => {
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
    (state, action) => {
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
    (state, action) => {
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
    (state) => {
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
    (state) => {
      return {
        ...state,
        usernameAvailable: true
      }
    }
  ),
  on(
    AuthActions.apiClearUsernameAvailable,
    (state) => {
      return {
        ...state,
        usernameAvailable: false
      }
    }
  )
);
