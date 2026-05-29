import {ReactElement, ReactNode} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {MemoryRouter, type InitialEntry} from 'react-router-dom';
import {reducers} from '../features/rootReducers';
import {AlertContext} from '../common/alert/AlertContext';
import {ThemeContext} from '../hooks/theme/ThemeContext';
import {LanguageContext} from '../hooks/language/LanguageContext';
import type {AuthState, User} from '../features/auth/auth.type';
import type {AlertContextProps} from '../common/alert/Alert.type';
import type {ThemeContextValue} from '../common/theme-selector/theme.type';
import type {LanguageContextValue} from '../common/language-selector/language.types';

// --- Store helper ---

interface PreloadedState {
    auth?: Partial<AuthState>;
}

export function createTestStore(preloadedState?: PreloadedState) {
    const defaultAuth: AuthState = {
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
    };

    return configureStore({
        reducer: reducers,
        preloadedState: preloadedState ? {
            auth: {...defaultAuth, ...preloadedState.auth},
        } : undefined,
    });
}

// --- Mock context values ---

export const mockAlertContext: AlertContextProps = {
    showAlert: vi.fn(() => 'mock-alert-id'),
    hideAlert: vi.fn(),
    hideAllAlerts: vi.fn(),
};

export const mockThemeContext: ThemeContextValue = {
    currentTheme: 'default',
    setTheme: vi.fn(),
    backgroundMode: 'themed',
    setBackgroundMode: vi.fn(),
    themeOptions: [{id: 'default', name: 'Default', description: 'Default theme', color: '#3b82f6'}],
    getCurrentThemeInfo: () => ({id: 'default', name: 'Default', description: 'Default theme', color: '#3b82f6'}),
    resetTheme: vi.fn(),
    loadUserTheme: vi.fn(),
};

export const mockLanguageContext: LanguageContextValue = {
    currentLanguage: 'it',
    setLanguage: vi.fn(),
    languageOptions: [{id: 'it', name: 'Italiano', flag: '🇮🇹'}],
    resetLanguage: vi.fn(),
    loadUserLanguage: vi.fn(),
};

// --- Custom render ---

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    preloadedState?: PreloadedState;
    store?: ReturnType<typeof createTestStore>;
    initialEntries?: InitialEntry[];
    alertContext?: AlertContextProps;
    themeContext?: ThemeContextValue;
    languageContext?: LanguageContextValue;
}

function AllProviders({
    children,
    store,
    initialEntries = ['/'],
    alertContext = mockAlertContext,
    themeContext = mockThemeContext,
    languageContext = mockLanguageContext,
}: {
    children: ReactNode;
    store: ReturnType<typeof createTestStore>;
    initialEntries?: InitialEntry[];
    alertContext?: AlertContextProps;
    themeContext?: ThemeContextValue;
    languageContext?: LanguageContextValue;
}) {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <ThemeContext.Provider value={themeContext}>
                    <LanguageContext.Provider value={languageContext}>
                        <AlertContext.Provider value={alertContext}>
                            {children}
                        </AlertContext.Provider>
                    </LanguageContext.Provider>
                </ThemeContext.Provider>
            </MemoryRouter>
        </Provider>
    );
}

export function renderWithProviders(
    ui: ReactElement,
    options: CustomRenderOptions = {},
) {
    const {
        preloadedState,
        store = createTestStore(preloadedState),
        initialEntries,
        alertContext,
        themeContext,
        languageContext,
        ...renderOptions
    } = options;

    const result = render(ui, {
        wrapper: ({children}) => (
            <AllProviders
                store={store}
                initialEntries={initialEntries}
                alertContext={alertContext}
                themeContext={themeContext}
                languageContext={languageContext}
            >
                {children}
            </AllProviders>
        ),
        ...renderOptions,
    });

    return {...result, store};
}

// --- Mock user data ---

export const mockAdminUser: User = {
    id: '1',
    role: 'admin',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@crd.local',
    name: 'Admin User',
    short_name: 'AU',
    avatar: '',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
};

export const mockViewerUser: User = {
    id: '2',
    role: 'viewer',
    first_name: 'Viewer',
    last_name: 'User',
    email: 'viewer@crd.local',
    name: 'Viewer User',
    short_name: 'VU',
    avatar: '',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
};

// --- User event setup helper ---

export function setupUser() {
    return userEvent.setup();
}
