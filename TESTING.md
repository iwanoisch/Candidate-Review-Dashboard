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

## Test Suite — 132 test, 13 file, 0 fallimenti

| File | Test | Cosa copre |
|---|---|---|
| `authSlice.test.ts` | 9 | Unit test reducer auth: stato iniziale, login, logout, restore, errori |
| `useAuth.test.tsx` | 13 | Hook auth: login admin/viewer, credenziali errate (email sbagliata, password sbagliata, entrambe, vuote), logout, checkAuth, updateUser, no side effects su errore |
| `applicantSlice.test.ts` | 10 | Unit test reducer applicant: loadCandidates, appendCandidates, loadStats, selectCandidate, array vuoti, null |
| `useApplicant.test.tsx` | 19 | Hook applicant: caricamento candidati, ricerca vuota (empty []), paginazione, stats, dettaglio, ID inesistente→null, clear selection, errori API (alert mostrato, return null/false, stato consistente, app non crasha), addNote, deleteNote, changeCandidateStatus, timeline events |
| `useApiClient.test.tsx` | 13 | Client HTTP: GET/POST 200, Bearer token, 401→logout, 404→alert, 500→alert, 403, network error, timeout, body non-JSON, query params |
| `Login.test.tsx` | 11 | Form login: render, input, credenziali errate (3 combinazioni), campi vuoti (HTML required), login admin, login viewer, sessione scaduta, bottone disabilitato se autenticato |
| `Layout.test.tsx` | 5 | Layout: render outlet, admin vede tutti i menu, viewer NON vede Impostazioni, toggle sidebar |
| `RouteGuard.test.tsx` | 7 | Route guard: redirect non autenticato, redirect autenticato su public, ruolo corretto, ruolo errato→redirect, spinner loading |
| `RoleBasedAccess.test.tsx` | 11 | Ruoli: admin vede textarea/submit/delete note, admin NON vede cestino su note altrui, viewer NON vede textarea/submit/delete. Status: admin enabled, viewer disabled, click non chiama direttamente onStatusChange |
| `ModalConfirmations.test.tsx` | 10 | Modali: click cestino→modale warning, modale ha Elimina/Annulla, conferma→onDelete+hideModal, annulla→NON onDelete+hideModal. Status: click→modale info, stato corrente→no modale, conferma→onStatusChange, annulla→NON onStatusChange |
| `usePermissions.test.tsx` | 14 | Permessi: admin ha tutto, viewer solo read/theme, can/canAll/canAny, utente non autenticato |
| `Alert.test.tsx` | 7 | Componente alert: render, titolo, tipi, link, close |
| `ModalDialog.test.tsx` | 4 | Componente modale: render, tipi, link, click |

## Struttura

I test seguono il pattern `__tests__/` dentro ogni feature/componente:

```
src/
├── features/
│   ├── auth/__tests__/
│   │   ├── authSlice.test.ts
│   │   └── useAuth.test.tsx
│   └── applicant/__tests__/
│       ├── applicantSlice.test.ts
│       └── useApplicant.test.tsx
├── hooks/
│   ├── permissions/__tests__/
│   │   └── usePermissions.test.tsx
│   └── api/__tests__/
│       └── useApiClient.test.tsx
├── components/
│   ├── auth/__tests__/
│   │   └── RouteGuard.test.tsx
│   ├── layout/__tests__/
│   │   └── Layout.test.tsx
│   └── __tests__/
│       ├── RoleBasedAccess.test.tsx
│       └── ModalConfirmations.test.tsx
├── pages/login/__tests__/
│   └── Login.test.tsx
├── common/
│   ├── alert/__tests__/
│   │   └── Alert.test.tsx
│   └── modal-dialog/__tests__/
│       └── ModalDialog.test.tsx
└── test/
    ├── setup.ts
    └── test-utils.tsx
```

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

## Principio guida

> Se il frontend non crasha, il test passa.

Per ogni errore API verifico:
1. La funzione ritorna `null`/`false` (non throw)
2. L'errore viene mostrato via alert (non silenzioso)
3. Lo stato Redux resta consistente
4. `isLoading` torna a `false`
