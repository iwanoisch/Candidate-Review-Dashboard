import {renderHook, act} from '@testing-library/react';
import {useApiClient} from '../useApiClient';
import {mockAlertContext, mockAdminUser} from '../../../test/test-utils';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {AlertContext} from '../../../common/alert/AlertContext';
import {configureStore} from '@reduxjs/toolkit';
import {reducers} from '../../../features/rootReducers';
import type {ReactNode} from 'react';
import type {AuthState} from '../../../features/auth/auth.type';

function createAuthStore(authenticated = true) {
    const authState: AuthState = authenticated
        ? {isAuthenticated: true, user: mockAdminUser, token: 'test-bearer-token', isLoading: false, error: null}
        : {isAuthenticated: false, user: null, token: null, isLoading: false, error: null};

    return configureStore({
        reducer: reducers,
        preloadedState: {auth: authState},
    });
}

// We need to mock the store singleton used inside useApiClient
// Since vi.mock is hoisted, we use a mutable reference
let activeStore: ReturnType<typeof createAuthStore>;

vi.mock('../../../store/store.ts', async () => {
    const actual = await vi.importActual<typeof import('../../../store/store.ts')>('../../../store/store.ts');
    return {
        ...actual,
        get store() {
            return activeStore;
        },
    };
});

function createWrapper(store: ReturnType<typeof createAuthStore>) {
    return ({children}: { children: ReactNode }) => (
        <Provider store={store}>
            <MemoryRouter initialEntries={['/dashboard']}>
                <AlertContext.Provider value={mockAlertContext}>
                    {children}
                </AlertContext.Provider>
            </MemoryRouter>
        </Provider>
    );
}

function mockFetchResponse(status: number, body?: unknown, contentType = 'application/json') {
    return vi.fn().mockResolvedValue({
        status,
        ok: status >= 200 && status < 300,
        headers: {get: (name: string) => name === 'content-type' ? contentType : null},
        json: () => Promise.resolve(body),
    });
}

describe('useApiClient', () => {
    const originalFetch = globalThis.fetch;

    beforeEach(() => {
        vi.clearAllMocks();
        activeStore = createAuthStore(true);
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    describe('successful requests', () => {
        it('GET 200 — should return data', async () => {
            const mockData = {id: 1, name: 'Test Candidate'};
            globalThis.fetch = mockFetchResponse(200, mockData);

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.get('/candidates/1');
            });

            expect(response).toEqual(mockData);
            expect(result.current.isLoading).toBe(false);
        });

        it('POST 201 — should send body and return data', async () => {
            const mockResponse = {id: 1, created: true};
            globalThis.fetch = mockFetchResponse(201, mockResponse);

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.post('/candidates', {name: 'New'});
            });

            expect(response).toEqual(mockResponse);
            expect(globalThis.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/candidates'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({name: 'New'}),
                }),
            );
        });

        it('should include Bearer token in Authorization header', async () => {
            globalThis.fetch = mockFetchResponse(200, {});

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            await act(async () => {
                await result.current.get('/test');
            });

            const callArgs = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
            expect(callArgs[1].headers['Authorization']).toBe('Bearer test-bearer-token');
        });
    });

    describe('401 Unauthorized — session expired', () => {
        it('should dispatch logout, return null, NOT crash', async () => {
            globalThis.fetch = mockFetchResponse(401, {message: 'Token expired'});

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.get('/candidates');
            });

            expect(response).toBeNull();
            expect(activeStore.getState().auth.isAuthenticated).toBe(false);
            expect(activeStore.getState().auth.token).toBeNull();
        });
    });

    describe('404 Not Found', () => {
        it('should return null and show alert, NOT crash', async () => {
            globalThis.fetch = mockFetchResponse(404, {message: 'Resource not found'});

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.get('/candidates/9999');
            });

            expect(response).toBeNull();
            expect(result.current.isLoading).toBe(false);
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({type: 'error', message: 'Resource not found'}),
            );
        });

        it('should handle 404 without JSON body gracefully', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                status: 404,
                ok: false,
                headers: {get: () => 'text/html'},
                json: () => Promise.reject(new Error('not json')),
            });

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.get('/nonexistent');
            });

            expect(response).toBeNull();
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({type: 'error', message: 'Request failed'}),
            );
        });
    });

    describe('500 Internal Server Error', () => {
        it('should return null and show alert, NOT crash', async () => {
            globalThis.fetch = mockFetchResponse(500, {message: 'Internal server error'});

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.get('/candidates');
            });

            expect(response).toBeNull();
            expect(result.current.isLoading).toBe(false);
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({type: 'error', message: 'Internal server error'}),
            );
        });

        it('should handle 500 without JSON body gracefully', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                status: 500,
                ok: false,
                headers: {get: () => null},
                json: () => Promise.reject(new Error('no body')),
            });

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.put('/candidates/1', {status: 'hired'});
            });

            expect(response).toBeNull();
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({type: 'error', message: 'Request failed'}),
            );
        });
    });

    describe('403 Forbidden', () => {
        it('should return null and show alert, NOT crash', async () => {
            globalThis.fetch = mockFetchResponse(403, {message: 'Forbidden'});

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.del('/candidates/1');
            });

            expect(response).toBeNull();
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({type: 'error', message: 'Forbidden'}),
            );
        });
    });

    describe('Network errors', () => {
        it('should handle network failure (no internet), NOT crash', async () => {
            globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.get('/candidates');
            });

            expect(response).toBeNull();
            expect(result.current.isLoading).toBe(false);
            expect(mockAlertContext.showAlert).toHaveBeenCalledWith(
                expect.objectContaining({type: 'error', message: 'Failed to fetch'}),
            );
        });

        it('should handle timeout/abort errors, NOT crash', async () => {
            globalThis.fetch = vi.fn().mockRejectedValue(new DOMException('The operation was aborted', 'AbortError'));

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            let response: unknown;
            await act(async () => {
                response = await result.current.get('/slow-endpoint');
            });

            expect(response).toBeNull();
            expect(mockAlertContext.showAlert).toHaveBeenCalled();
        });
    });

    describe('query params', () => {
        it('should append query params to URL', async () => {
            globalThis.fetch = mockFetchResponse(200, []);

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            await act(async () => {
                await result.current.get('/candidates', undefined, {page: 1, status: 'active'});
            });

            const url = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
            expect(url).toContain('page=1');
            expect(url).toContain('status=active');
        });

        it('should skip null/undefined query params', async () => {
            globalThis.fetch = mockFetchResponse(200, []);

            const wrapper = createWrapper(activeStore);
            const {result} = renderHook(() => useApiClient(), {wrapper});

            await act(async () => {
                await result.current.get('/candidates', undefined, {page: 1, filter: undefined, sort: null});
            });

            const url = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
            expect(url).toContain('page=1');
            expect(url).not.toContain('filter');
            expect(url).not.toContain('sort');
        });
    });
});
