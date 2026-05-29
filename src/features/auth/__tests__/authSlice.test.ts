import authReducer, {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    restoreAuth,
    userError,
} from '../authSlice';
import type {AuthState} from '../auth.type';
import {mockAdminUser} from '../../../test/test-utils';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

describe('authSlice', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    describe('loginStart', () => {
        it('should set isLoading to true and clear error', () => {
            const stateWithError: AuthState = {...initialState, error: 'some error'};
            const result = authReducer(stateWithError, loginStart());

            expect(result.isLoading).toBe(true);
            expect(result.error).toBeNull();
        });
    });

    describe('loginSuccess', () => {
        it('should set authenticated state with user and token', () => {
            const payload = {user: mockAdminUser, token: 'test-token'};
            const result = authReducer(initialState, loginSuccess(payload));

            expect(result.isAuthenticated).toBe(true);
            expect(result.user).toEqual(mockAdminUser);
            expect(result.token).toBe('test-token');
            expect(result.isLoading).toBe(false);
            expect(result.error).toBeNull();
        });

        it('should clear loading state from loginStart', () => {
            const loadingState: AuthState = {...initialState, isLoading: true};
            const payload = {user: mockAdminUser, token: 'test-token'};
            const result = authReducer(loadingState, loginSuccess(payload));

            expect(result.isLoading).toBe(false);
            expect(result.isAuthenticated).toBe(true);
        });
    });

    describe('loginFailure', () => {
        it('should reset auth state and set error', () => {
            const authenticatedState: AuthState = {
                isAuthenticated: true,
                user: mockAdminUser,
                token: 'test-token',
                isLoading: true,
                error: null,
            };
            const result = authReducer(authenticatedState, loginFailure('Invalid credentials'));

            expect(result.isAuthenticated).toBe(false);
            expect(result.user).toBeNull();
            expect(result.token).toBeNull();
            expect(result.isLoading).toBe(false);
            expect(result.error).toBe('Invalid credentials');
        });
    });

    describe('logout', () => {
        it('should reset to unauthenticated state', () => {
            const authenticatedState: AuthState = {
                isAuthenticated: true,
                user: mockAdminUser,
                token: 'test-token',
                isLoading: false,
                error: null,
            };
            const result = authReducer(authenticatedState, logout());

            expect(result.isAuthenticated).toBe(false);
            expect(result.user).toBeNull();
            expect(result.token).toBeNull();
            expect(result.isLoading).toBe(false);
            expect(result.error).toBeNull();
        });
    });

    describe('restoreAuth', () => {
        it('should restore authentication from persisted state', () => {
            const payload = {user: mockAdminUser, token: 'restored-token'};
            const result = authReducer(initialState, restoreAuth(payload));

            expect(result.isAuthenticated).toBe(true);
            expect(result.user).toEqual(mockAdminUser);
            expect(result.token).toBe('restored-token');
            expect(result.isLoading).toBe(false);
        });
    });

    describe('userError', () => {
        it('should set the error message', () => {
            const result = authReducer(initialState, userError('Something went wrong'));
            expect(result.error).toBe('Something went wrong');
        });

        it('should clear the error when null is passed', () => {
            const stateWithError: AuthState = {...initialState, error: 'existing error'};
            const result = authReducer(stateWithError, userError(null));
            expect(result.error).toBeNull();
        });
    });
});
