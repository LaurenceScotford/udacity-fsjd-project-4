import * as fromAuth from './auth.reducer';
import * as fromActions from './auth.actions';
import { AuthState } from './auth.models';

describe('AuthReducer', () => {

    const { initialState } = fromAuth;

    it('should set a status of "loading" when the login action is dispatched', () => {

        const statusString: AuthState['status'] = 'loading';
        const action = fromActions.login;
        const state = fromAuth.reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            status: statusString
        });
    });

    it('should set a status of "loading" when the autoLogin action is dispatched', () => {

        const statusString: AuthState['status'] = 'loading';
        const action = fromActions.autoLogin;
        const state = fromAuth.reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            status: statusString
        });
    });

    it('should store the auth user and set a status of "success" when the autoLoginSuccess action is dispatched', () => {

        const username = 'username';
        const statusString: AuthState['status'] = 'success';
        const idToken = 'idToken';
        const expiresAt = 1;
        const timer = setTimeout(() => { return }, 1);

        const action = fromActions.autoLoginSuccess({
            userData: {
                username: username,
                token: {
                    idToken: idToken,
                    expiresAt: expiresAt
                },
                timer: timer
            }
        });
        const state = fromAuth.reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            authUser: {
                username: username,
                token: {
                    idToken: idToken,
                    expiresAt: expiresAt
                }
            },
            status: statusString
        });
    });

    it('should set a status of "pending" and clear user data when the autoLoginFailure action is dispatched', () => {

        const statusString: AuthState['status'] = 'pending';
        const action = fromActions.autoLoginFailure;
        const startState: AuthState = {
            ...initialState,
            authUser: {
                username: 'username',
                token: {
                    idToken: 'idToken',
                    expiresAt: 1
                }
            },
            status: 'loading'
        };

        const state = fromAuth.reducer(startState, action);

        expect(state).toEqual({
            ...initialState,
            authUser: {
                username: null,
                token: null
            },
            status: statusString
        });
    });

    it('should store the auth user and set a status of "success" when the loginSuccess action is dispatched', () => {

        const userId = 'userId';
        const username = 'username';
        const statusString: AuthState['status'] = 'success';
        const idToken = 'idToken';
        const expiresAt = 1;

        const action = fromActions.apiLoginSuccess({
            userId: userId,
            username: username,
            token: {
                idToken: idToken,
                expiresAt: expiresAt
            }
        });
        const state = fromAuth.reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            authUser: {
                username: username,
                token: {
                    idToken: idToken,
                    expiresAt: expiresAt
                }
            },
            status: statusString
        });
    });

    it('should set a status of "error" and clear user data when the apiLoginFailure action is dispatched', () => {

        const statusString: AuthState['status'] = 'error';
        const action = fromActions.apiLoginFailure;
        const startState: AuthState = {
            ...initialState,
            authUser: {
                username: 'username',
                token: {
                    idToken: 'idToken',
                    expiresAt: 1
                }
            },
            status: 'loading'
        };
        const state = fromAuth.reducer(startState, action);

        expect(state).toEqual({
            ...initialState,
            authUser: {
                username: null,
                token: null
            },
            status: statusString
        });
    });

    it('should set a status of "pending" and clear user data when the logout action is dispatched', () => {

        const statusString: AuthState['status'] = 'pending';
        const action = fromActions.logout;
        const startState: AuthState = {
            ...initialState,
            authUser: {
                username: 'username',
                token: {
                    idToken: 'idToken',
                    expiresAt: 1
                }
            },
            status: 'loading'
        };
        const state = fromAuth.reducer(startState, action);

        expect(state).toEqual({
            ...initialState,
            authUser: {
                username: null,
                token: null
            },
            status: statusString
        });
    });

    it('should set a status of "pending" and clear user data when the autoLogout action is dispatched', () => {

        const statusString: AuthState['status'] = 'pending';
        const action = fromActions.autoLogout;
        const startState: AuthState = {
            ...initialState,
            authUser: {
                username: 'username',
                token: {
                    idToken: 'idToken',
                    expiresAt: 1
                }
            },
            status: 'loading'
        };
        const state = fromAuth.reducer(startState, action);

        expect(state).toEqual({
            ...initialState,
            authUser: {
                username: null,
                token: null
            },
            status: statusString
        });
    });

    it('should set username_available to true when the apiSetUsernameAvailable action is dispatched', () => {

        const action = fromActions.apiSetUsernameAvailable;
        const startState: AuthState = {
            ...initialState,
            usernameAvailable: false
        };
        const state = fromAuth.reducer(startState, action);

        expect(state).toEqual({
            ...initialState,
            usernameAvailable: true
        });
    });

    it('should set username_available to false when the apiClearUsernameAvailable action is dispatched', () => {

        const action = fromActions.apiClearUsernameAvailable;
        const state = fromAuth.reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            usernameAvailable: false
        });
    });

});