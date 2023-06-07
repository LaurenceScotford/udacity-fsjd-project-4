import * as fromActions from './auth.actions';

describe('Auth Actions', () => {
    it('should create the Check Username Availability action', () => {
        const payload = {
            username: 'username'
        };

        const action = fromActions.checkUserNameAvailability(payload);

        expect(action).toEqual({
            type: '[auth] Check Username Availability',
            username: payload.username
        });
    });

    it('should create the Register action', () => {
        const payload = {
            userData: {
                id: null,
                auth_level: 1,
                first_name: 'First',
                last_name: 'Last',
                username: 'username',
                password: 'password'
            }
        };

        const action = fromActions.register(payload);

        expect(action).toEqual({
            type: '[auth] Register',
            userData: payload.userData
        });
    });

    it('should create the Login action', () => {
        const payload = {
            userData: {
                username: 'username',
                password: 'password'
            }
        };

        const action = fromActions.login(payload);

        expect(action).toEqual({
            type: '[auth] Login',
            userData: payload.userData
        });
    });

    it('should create the Auto Login action', () => {

        const action = fromActions.autoLogin();

        expect(action).toEqual({
            type: '[auth] Auto Login'
        });
    });

    it('should create the Auto Login Success action', () => {
        const payload = {
            userData: {
                username: 'username',
                token: {
                    idToken: 'idToken',
                    expiresAt: 1
                },
                timer: setTimeout(() => false, 0)
            }
        };

        const action = fromActions.autoLoginSuccess(payload);

        expect(action).toEqual({
            type: '[auth] Auto Login Success',
            userData: payload.userData
        });
    });

    it('should create the Auto Login Failure action', () => {

        const action = fromActions.autoLoginFailure();

        expect(action).toEqual({
            type: '[auth] Auto Login Failure'
        });
    });

    it('should create the Auto Logout action', () => {

        const action = fromActions.autoLogout();

        expect(action).toEqual({
            type: '[auth] Auto Logout'
        });
    });

    it('should create the Logout action', () => {

        const action = fromActions.logout();

        expect(action).toEqual({
            type: '[auth] Logout'
        });
    });

    it('should create the API Username Available action', () => {
        const payload = {
            userData: {
                id: 1,
                auth_level: 1,
                first_name: 'First',
                last_name: 'Last',
                username: 'username',
                password: 'password'
            }
        };

        const action = fromActions.apiUsernameAvailable(payload);

        expect(action).toEqual({
            type: '[auth] API Username Available',
            userData: payload.userData
        });
    });

    it('should create the API Username Unavailable action', () => {

        const action = fromActions.apiUsernameUnavailable();

        expect(action).toEqual({
            type: '[auth] API Username Unavailable'
        });
    });

    it('should create the API Username Failure action', () => {

        const action = fromActions.apiUsernameFailure();

        expect(action).toEqual({
            type: '[auth] API Username Failure'
        });
    });

    it('should create the API Register Success action', () => {

        const action = fromActions.apiRegisterSuccess();

        expect(action).toEqual({
            type: '[auth] API Register Success'
        });
    });

    it('should create the API Register Failure action', () => {

        const action = fromActions.apiRegisterFailure();

        expect(action).toEqual({
            type: '[auth] API Register Failure'
        });
    });

    it('should create the API Login Success action', () => {
        const payload = {
            userId: '1',
            username: 'username',
            token: {
                idToken: 'idToken',
                expiresAt: 1
            }
        };

        const action = fromActions.apiLoginSuccess(payload);

        expect(action).toEqual({
            type: '[auth] API Login Success',
            userId: payload.userId,
            username: payload.username,
            token: payload.token
        });
    });

    it('should create the API Login Failure action', () => {

        const action = fromActions.apiLoginFailure();

        expect(action).toEqual({
            type: '[auth] API Login Failure'
        });
    });

    it('should create the API Login Unauthorised action', () => {

        const action = fromActions.apiLoginUnauthorised();

        expect(action).toEqual({
            type: '[auth] API Login Unauthorised'
        });
    });

    it('should create the API Set Username Available action', () => {

        const action = fromActions.apiSetUsernameAvailable();

        expect(action).toEqual({
            type: '[auth] API Set Username Available'
        });
    });

    it('should create the API Clear Username Available action', () => {

        const action = fromActions.apiClearUsernameAvailable();

        expect(action).toEqual({
            type: '[auth] API Clear Username Available'
        });
    });
});