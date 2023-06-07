export const authLocalStorageName = 'auth';

export interface ApiAuthToken {
    userId: string;
    idToken: string;
    expiresIn: number;
}

export interface LocalAuthToken {
    idToken: string;
    expiresAt: number;
}

export interface AuthInfo {
    username: string;
    token: LocalAuthToken;
    timer: ReturnType<typeof setTimeout>;
}

export interface AuthUser {
    username: string | null;
    token: LocalAuthToken | null;
}

export interface AuthState {
    usernameAvailable: boolean;
    authUser: AuthUser;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export interface User {
    username: string;
    password: string;
}

export interface NewUser {
    id: number | string | null;
    auth_level: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}
