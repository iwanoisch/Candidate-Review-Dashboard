# Testing - Candidate Review Dashboard

## Stack

- **Vitest** — test runner (integrato con Vite)
- **React Testing Library** — test di componenti React
- **@testing-library/user-event** — simulazione interazioni utente
- **jsdom** — ambiente DOM per i test

## Comandi

```bash
npm test          # Avvia Vitest in watch mode
npm run test:run  # Esegue tutti i test una volta
```

## Struttura

I test seguono il pattern `__tests__/` dentro ogni feature/componente:

```
src/
├── features/auth/
│   └── __tests__/
│       ├── authSlice.test.ts        # Unit test reducer
│       └── useAuth.test.tsx         # Integration test hook
├── hooks/
│   ├── permissions/__tests__/
│   │   └── usePermissions.test.tsx  # Unit test hook + costanti
│   └── api/__tests__/
│       └── useApiClient.test.tsx    # Integration test API client (401, 404, 500, network)
├── components/
│   ├── auth/__tests__/
│   │   └── RouteGuard.test.tsx      # Component test guardia rotte
│   └── layout/__tests__/
│       └── Layout.test.tsx          # Component test layout + sidebar
├── pages/login/
│   └── __tests__/
│       └── Login.test.tsx           # Component test pagina login
├── common/
│   ├── alert/__tests__/
│   │   └── Alert.test.tsx           # Component test alert
│   └── modal-dialog/__tests__/
│       └── ModalDialog.test.tsx     # Component test modal dialog
└── test/
    ├── setup.ts                     # Setup globale (cleanup, jest-dom)
    └── test-utils.tsx               # Custom render con tutti i Provider
```

## Checklist Implementazione Test

- [x] **Setup Vitest + React Testing Library** — Installazione dipendenze, configurazione vitest.config.ts, setup.ts, script npm
- [x] **Test utilities (render wrapper)** — Custom render con Redux Provider, MemoryRouter, Alert/Theme/Language Context, mock user data
- [x] **Unit test: authSlice** — 9 test: stato iniziale, loginStart, loginSuccess, loginFailure, logout, restoreAuth, userError
- [x] **Unit test: permissions** — 12 test: ROLE_PERMISSIONS, can(), canAll(), canAny() per admin/viewer/unauthenticated
- [x] **Integration test: useAuth** — 15 test: login admin/viewer, email giusta+pwd sbagliata, email sbagliata+pwd giusta, credenziali vuote, tema/lingua non caricati su errore, logout, checkAuth, restoreAuth, updateUser
- [x] **Integration test: useApiClient** — 13 test: GET 200, POST 201, Bearer token, 401 (logout+redirect), 404 (con/senza JSON), 500 (con/senza JSON), 403, network failure, timeout/abort, query params
- [x] **Component test: RouteGuard** — 7 test: public/protected routes, redirect autenticati, ruoli, loading spinner
- [x] **Component test: Login page** — 11 test: rendering form, input, credenziali entrambe sbagliate, email giusta+pwd sbagliata, email sbagliata+pwd giusta, campi vuoti (HTML required), login admin, login viewer, sessione scaduta, bottone disabilitato
- [x] **Component test: Layout + SideBar** — 5 test: outlet, menu items admin/viewer, toggle sidebar
- [x] **Component test: Alert** — 7 test: rendering, tipi diversi, close, action links
- [x] **Component test: ModalDialog** — 4 test: rendering, tipi diversi, action links, click handler
- [x] **Verifica finale** — 82/82 test passati, 0 errori lint

## Test Utilities

Il file `src/test/test-utils.tsx` fornisce:

- `renderWithProviders(ui, options)` — Render con Redux store, MemoryRouter e tutti i Context
- `createTestStore(preloadedState)` — Crea uno store Redux per i test
- `mockAdminUser` / `mockViewerUser` — User mock pronti all'uso
- `mockAlertContext` / `mockThemeContext` / `mockLanguageContext` — Context mock con vi.fn()
- `setupUser()` — Setup di userEvent per simulare interazioni

### Esempio di utilizzo

```tsx
import {screen} from '@testing-library/react';
import {renderWithProviders, mockAdminUser, setupUser} from '../../../test/test-utils';

it('should render for authenticated admin', () => {
    renderWithProviders(<MyComponent/>, {
        preloadedState: {
            auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'},
        },
        initialEntries: ['/dashboard'],
    });

    expect(screen.getByText('Welcome')).toBeInTheDocument();
});
```

## Totale: 9 file di test, 82 test case
