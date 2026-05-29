# Linee Guida per i Test - Candidate Review Dashboard

Questo file serve come prompt/riferimento per creare test completi ogni volta che si sviluppa una nuova feature.

## Regola d'oro

Ogni feature deve avere test per il **percorso positivo** (happy path) E per **tutti i percorsi negativi** (errori, edge case, input invalidi). Il FE non deve MAI crashare per errori del backend o input utente errati.

## Struttura file

Creare una cartella `__tests__/` dentro la feature:

```
src/features/nomeFeature/
├── slice/nomeFeatureSlice.ts
├── hooks/useNomeFeature.ts
└── __tests__/
    ├── nomeFeatureSlice.test.ts    # Unit test reducer
    └── useNomeFeature.test.tsx     # Integration test hook

src/pages/nomePagina/
├── NomePagina.tsx
└── __tests__/
    └── NomePagina.test.tsx         # Component test

src/common/nomeComponente/
├── NomeComponente.tsx
└── __tests__/
    └── NomeComponente.test.tsx     # Component test
```

## Checklist per ogni nuovo sviluppo

### 1. Redux Slice (unit test)

Per ogni slice, testare:

- [ ] Stato iniziale restituito correttamente
- [ ] Ogni reducer modifica lo stato come previsto
- [ ] Reducer con payload valido
- [ ] Reducer con payload edge case (null, stringa vuota, oggetto parziale)
- [ ] Le transizioni di stato sono corrette (loading -> success, loading -> failure)

```ts
// Pattern
import reducer, {action1, action2} from '../slice/featureSlice';

describe('featureSlice', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('action1 should...', () => {
        const result = reducer(initialState, action1(payload));
        expect(result.field).toBe(expected);
    });
});
```

### 2. Hook custom (integration test)

Per ogni hook, testare:

- [ ] Stato iniziale
- [ ] **Happy path**: operazione con dati validi -> risultato corretto
- [ ] **Errore input**: dati invalidi, parziali, vuoti
- [ ] **Errore backend**: cosa succede quando l'API ritorna 401, 404, 500
- [ ] **Errore rete**: cosa succede quando non c'e' connessione
- [ ] Side effects: dispatch Redux, chiamate a context (alert, theme, language)
- [ ] Side effects NON eseguiti su errore (es: non caricare tema dopo login fallito)

```tsx
// Pattern
import {renderHook, act} from '@testing-library/react';
import {useFeature} from '../hooks/useFeature';
import {createTestStore, mockAlertContext} from '../../../test/test-utils';

// Creare wrapper con Provider necessari
function createWrapper(preloaded?) {
    const store = createTestStore(preloaded);
    return ({children}) => (
        <Provider store={store}>
            <MemoryRouter>
                <AlertContext.Provider value={mockAlertContext}>
                    {children}
                </AlertContext.Provider>
            </MemoryRouter>
        </Provider>
    );
}

describe('useFeature', () => {
    describe('happy path', () => { /* ... */ });
    describe('error cases', () => { /* ... */ });
    describe('side effects', () => { /* ... */ });
});
```

### 3. Componente/Pagina (component test)

Per ogni componente, testare:

- [ ] **Rendering base**: il componente si monta senza errori
- [ ] **Contenuto visibile**: testi, label, bottoni presenti
- [ ] **Interazione positiva**: click, submit, input -> risultato atteso
- [ ] **Interazione negativa**: submit con dati sbagliati -> errore visibile, no crash
- [ ] **Variante per input invalido specifico**:
  - Campo A corretto + campo B sbagliato
  - Campo A sbagliato + campo B corretto
  - Entrambi sbagliati
  - Campi vuoti (se hanno `required`, verificare che il form non viene inviato)
- [ ] **Stati UI**: loading (bottone disabilitato/spinner), errore (messaggio visibile), empty state
- [ ] **Ruoli**: admin vede X, viewer non vede X
- [ ] **Redirect/navigazione**: dopo azione, si naviga alla pagina corretta

```tsx
// Pattern
import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders, setupUser, mockAdminUser} from '../../../test/test-utils';

describe('MyPage', () => {
    it('should render', () => {
        renderWithProviders(<MyPage/>);
        expect(screen.getByText('...')).toBeInTheDocument();
    });

    describe('form submission', () => {
        it('happy path — valid data', async () => { /* ... */ });
        it('error — field A wrong', async () => { /* ... */ });
        it('error — field B wrong', async () => { /* ... */ });
        it('error — both wrong', async () => { /* ... */ });
        it('error — fields empty', async () => { /* ... */ });
    });

    describe('role-based visibility', () => {
        it('admin sees edit button', () => { /* ... */ });
        it('viewer does NOT see edit button', () => { /* ... */ });
    });
});
```

### 4. API Client / Chiamate HTTP

Per ogni endpoint usato, testare con `global.fetch` mockato:

- [ ] **200/201** — risposta corretta, dati parsati
- [ ] **401** — logout automatico, redirect a login, NO crash
- [ ] **403** — messaggio errore in alert, NO crash
- [ ] **404** — messaggio errore in alert, NO crash
- [ ] **404 senza body JSON** — fallback a messaggio generico, NO crash
- [ ] **500** — messaggio errore in alert, NO crash
- [ ] **500 senza body JSON** — fallback a messaggio generico, NO crash
- [ ] **Network error** (niente internet) — alert, NO crash
- [ ] **Timeout/abort** — gestito gracefully, NO crash
- [ ] **isLoading** torna a false dopo errore

```ts
// Pattern per mock fetch
global.fetch = vi.fn().mockResolvedValue({
    status: 404,
    ok: false,
    headers: {get: () => 'application/json'},
    json: () => Promise.resolve({message: 'Not found'}),
});
```

## Import e utilities disponibili

```tsx
// Test utilities
import {renderWithProviders, setupUser, createTestStore} from '../../../test/test-utils';
import {mockAdminUser, mockViewerUser} from '../../../test/test-utils';
import {mockAlertContext, mockThemeContext, mockLanguageContext} from '../../../test/test-utils';

// Testing library
import {screen, waitFor} from '@testing-library/react';
import {renderHook, act} from '@testing-library/react';

// Mock i18next (mettere in cima al file test)
vi.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key: string, fallback: string) => fallback}),
}));
```

## Naming convention test

- File: `NomeFile.test.ts` o `NomeFile.test.tsx` (tsx se contiene JSX)
- `describe` esterno: nome del modulo/componente
- `describe` interni: raggruppare per funzionalita o scenario
- `it`: frase che descrive il comportamento atteso, in inglese

```ts
describe('CandidateForm', () => {
    describe('form submission', () => {
        it('should save candidate on valid submission', ...);
        it('should show error when name is empty', ...);
        it('should show error when email is invalid', ...);
    });
    describe('role-based access', () => {
        it('admin should see delete button', ...);
        it('viewer should NOT see delete button', ...);
    });
});
```

## Principio: se il FE non crasha, il test passa

Il test piu' importante per ogni errore backend e': **il FE non crasha**.
Verificare sempre:
1. La funzione ritorna `null` (non throw)
2. `isLoading` torna a `false`
3. L'errore viene mostrato via alert (non silenzioso)
4. Lo stato Redux resta consistente