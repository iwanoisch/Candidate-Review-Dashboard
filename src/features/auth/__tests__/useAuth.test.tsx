import {renderHook, act} from '@testing-library/react';
import {useAuth} from '../hooks/useAuth';
import {
    createTestStore,
    mockAdminUser,
    mockAlertContext,
    mockThemeContext,
    mockLanguageContext,
} from '../../../test/test-utils';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {AlertContext} from '../../../common/alert/AlertContext';
import {ThemeContext} from '../../../hooks/theme/ThemeContext';
import {LanguageContext} from '../../../hooks/language/LanguageContext';
import type {ReactNode} from 'react';

function createWrapper(preloadedAuth?: Parameters<typeof createTestStore>[0]) {
    const store = createTestStore(preloadedAuth);
    const wrapper = ({children}: {children: ReactNode}) => (
        <Provider store={store}>
            <MemoryRouter>
                <ThemeContext.Provider value={mockThemeContext}>
                    <LanguageContext.Provider value={mockLanguageContext}>
                        <AlertContext.Provider value={mockAlertContext}>
                            {children}
                        </AlertContext.Provider>
                    </LanguageContext.Provider>
                </ThemeContext.Provider>
            </MemoryRouter>
        </Provider>
    );
    return {wrapper, store};
}

describe('useAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('initial state', () => {
        it('should return unauthenticated state by default', () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.user).toBeNull();
            expect(result.current.token).toBeNull();
            expect(result.current.isLoading).toBe(false);
        });
    });

    describe('login', () => {
        it('should login successfully with valid credentials (admin/admin)', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let loginResult: {success: boolean; error?: string};
            await act(async () => {
                loginResult = await result.current.login('admin', 'admin');
            });

            expect(loginResult!.success).toBe(true);
            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.user?.email).toBe('admin@crd.local');
            expect(result.current.token).toBe('mock-token-admin-001');
            expect(mockThemeContext.loadUserTheme).toHaveBeenCalledWith(1);
            expect(mockLanguageContext.loadUserLanguage).toHaveBeenCalledWith(1);
        });

        it('should login successfully with viewer credentials', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let loginResult: {success: boolean; error?: string};
            await act(async () => {
                loginResult = await result.current.login('viewer', 'viewer');
            });

            expect(loginResult!.success).toBe(true);
            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.user?.role).toBe('viewer');
        });

        it('should fail with both credentials wrong', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let loginResult: {success: boolean; error?: string};
            await act(async () => {
                loginResult = await result.current.login('wrong', 'wrong');
            });

            expect(loginResult!.success).toBe(false);
            expect(loginResult!.error).toBe('Credenziali non valide');
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.user).toBeNull();
            expect(result.current.token).toBeNull();
        });

        it('should fail with correct email but wrong password', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let loginResult: {success: boolean; error?: string};
            await act(async () => {
                loginResult = await result.current.login('admin', 'wrongpassword');
            });

            expect(loginResult!.success).toBe(false);
            expect(loginResult!.error).toBe('Credenziali non valide');
            expect(result.current.isAuthenticated).toBe(false);
        });

        it('should fail with wrong email but correct password', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let loginResult: {success: boolean; error?: string};
            await act(async () => {
                loginResult = await result.current.login('wrongemail', 'admin');
            });

            expect(loginResult!.success).toBe(false);
            expect(loginResult!.error).toBe('Credenziali non valide');
            expect(result.current.isAuthenticated).toBe(false);
        });

        it('should fail with empty credentials', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let loginResult: {success: boolean; error?: string};
            await act(async () => {
                loginResult = await result.current.login('', '');
            });

            expect(loginResult!.success).toBe(false);
            expect(result.current.isAuthenticated).toBe(false);
        });

        it('should not load theme/language on failed login', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            await act(async () => {
                await result.current.login('wrong', 'wrong');
            });

            expect(mockThemeContext.loadUserTheme).not.toHaveBeenCalled();
            expect(mockLanguageContext.loadUserLanguage).not.toHaveBeenCalled();
        });
    });

    describe('logout', () => {
        it('should clear auth state', async () => {
            const {wrapper} = createWrapper({
                auth: {
                    isAuthenticated: true,
                    user: mockAdminUser,
                    token: 'mock-token',
                },
            });
            const {result} = renderHook(() => useAuth(), {wrapper});

            expect(result.current.isAuthenticated).toBe(true);

            await act(async () => {
                await result.current.logout();
            });

            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.user).toBeNull();
            expect(result.current.token).toBeNull();
            expect(mockThemeContext.resetTheme).toHaveBeenCalled();
            expect(mockLanguageContext.resetLanguage).toHaveBeenCalled();
        });
    });

    describe('checkAuth', () => {
        it('should return true when token and user exist', async () => {
            const {wrapper} = createWrapper({
                auth: {
                    isAuthenticated: true,
                    user: mockAdminUser,
                    token: 'mock-token',
                },
            });
            const {result} = renderHook(() => useAuth(), {wrapper});

            let checkResult: boolean;
            await act(async () => {
                checkResult = await result.current.checkAuth();
            });

            expect(checkResult!).toBe(true);
        });

        it('should return false when no token exists', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let checkResult: boolean;
            await act(async () => {
                checkResult = await result.current.checkAuth();
            });

            expect(checkResult!).toBe(false);
        });

        it('should restore auth when state has token/user but isAuthenticated is false', async () => {
            const {wrapper} = createWrapper({
                auth: {
                    isAuthenticated: false,
                    user: mockAdminUser,
                    token: 'mock-token',
                },
            });
            const {result} = renderHook(() => useAuth(), {wrapper});

            await act(async () => {
                await result.current.checkAuth();
            });

            expect(result.current.isAuthenticated).toBe(true);
        });
    });

    describe('updateUser', () => {
        it('should update user fields', async () => {
            const {wrapper} = createWrapper({
                auth: {
                    isAuthenticated: true,
                    user: mockAdminUser,
                    token: 'mock-token',
                },
            });
            const {result} = renderHook(() => useAuth(), {wrapper});

            let updatedUser: unknown;
            await act(async () => {
                updatedUser = await result.current.updateUser({first_name: 'Updated'});
            });

            expect(updatedUser).toBeTruthy();
            expect(result.current.user?.first_name).toBe('Updated');
        });

        it('should return null when no token exists', async () => {
            const {wrapper} = createWrapper();
            const {result} = renderHook(() => useAuth(), {wrapper});

            let updatedUser: unknown;
            await act(async () => {
                updatedUser = await result.current.updateUser({first_name: 'Test'});
            });

            expect(updatedUser).toBeNull();
        });
    });
});
