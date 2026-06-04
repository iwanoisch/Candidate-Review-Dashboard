# Candidate Review Dashboard

Web application per la gestione di candidati in un processo di selezione. Permette di visualizzare, filtrare, valutare e gestire candidati attraverso una dashboard completa con ruoli utente differenziati. Layout responsive e ottimizzato per mobile.

## Quick Start

```bash
# Installazione dipendenze
npm install

# Avvio dev server
npm run dev

# Credenziali demo
# Admin:  admin / admin
# Viewer: viewer / viewer
```

## Comandi disponibili

| Comando | Descrizione |
|---|---|
| `npm run dev` | Dev server (Vite) |
| `npm run build` | TypeScript check + build produzione |
| `npm run lint` | ESLint |
| `npm test` | Test in modalita watch |
| `npm run test:run` | Esegui tutti i test una volta |
| `npm run preview` | Preview build di produzione |

---

## Stack scelto e motivazioni

| Tecnologia | Motivazione                                                                                                                                                                                                                                                                                                                                             |
|---|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **React 19** | Framework standard enterprise, ampio ecosistema, team facilmente reperibile                                                                                                                                                                                                                                                                             |
| **TypeScript** | Type safety, refactoring sicuro, documentazione implicita del codice                                                                                                                                                                                                                                                                                    |
| **Vite** | Build velocissimo, HMR istantaneo, configurazione minimale rispetto a Webpack                                                                                                                                                                                                                                                                           |
| **Redux Toolkit** | Per un progetto di queste dimensioni sarebbe bastato `useContext` + `useReducer`, ma ho scelto ReduxToolKit in ottica di scalabilita: se l'app cresce (piu feature, flussi complessi, caching), avere gia Redux evita una migrazione futura. Inoltre il dev tools facilita il debug dello stato                                                         |
| **redux-persist** | Persistenza dello stato auth in sessionStorage (non localStorage, per sicurezza). Soluzione temporanea in attesa di un backend con API reali dove poter validare il token lato server e gestire il session check. Le preferenze utente (tema, lingua, sidebar) sono in localStorage poiche sono dati non sensibili che devono persistere tra le sessioni |
| **Tailwind CSS v4** | Utility-first, nessun CSS custom, design system coerente, theming via CSS variables                                                                                                                                                                                                                                                                     |
| **Headless UI** | Componenti accessibili (Dialog, RadioGroup) senza stile imposto, compatibili con Tailwind                                                                                                                                                                                                                                                               |
| **react-router-dom v7** | Routing standard, lazy loading pagine, route guard                                                                                                                                                                                                                                                                                                      |
| **i18next** | Internazionalizzazione con 2 lingue (IT, EN), lazy loading traduzioni, persistenza preferenza utente                                                                                                                                                                                                                                                    |
| **Vitest** | Test runner nativo Vite, zero config aggiuntiva, compatibile con Jest API                                                                                                                                                                                                                                                                               |
| **Framer Motion** | Animazioni dichiarative per alert e modali                                                                                                                                                                                                                                                                                                              |

---

## Architettura del progetto

### Entry Flow

```
index.html -> Main.tsx (provider tree) -> AppRouting.tsx (BrowserRouter + routes)
```

### Provider Hierarchy

```
Redux Provider
  -> PersistGate
    -> ThemeProvider
      -> LanguageProvider
        -> AlertProvider
          -> ApiSimulationProvider
            -> ModalDialogProvider
              -> AppRouting
```

### Struttura cartelle

```
src/
  features/           # Feature slices (auth, applicant)
    auth/              # authSlice, useAuth, auth.type, __tests__/
    applicant/         # applicantSlice, useApplicant, applicant.type, __tests__/
  pages/               # Pagine (Dashboard, Login, Settings, NotFound)
  components/          # Componenti specifici (CandidateDetail, Notes, Timeline, ...)
  common/              # Componenti riutilizzabili (Alert, ModalDialog, Spinner, Sidebar, ...)
  hooks/               # Hook generici (useApiClient, usePermissions, useTheme, useLanguage)
  constants/           # Costanti (filtri, routes, layout)
  data_mock/           # Dati mock (candidati, dettagli, statistiche)
  utility/             # Funzioni utility (filtro candidati, alert utils)
  store/               # Redux store configuration
  test/                # Test utilities e setup
  types/               # Tipi globali
```

### Convenzione feature

Struttura flat per ogni feature:
```
features/applicant/
  applicantSlice.ts       # Redux slice
  useApplicant.ts         # Hook principale
  applicant.type.ts       # Tipi
  __tests__/              # Test
```

---

## Gestione dati/API

**Nessun backend reale.** L'app usa dati mockati (`src/data_mock/`) che simulano risposte API:

- `APPLICANT_DATA_MOCK` — lista di 37 candidati con dati realistici
- `APPLICANT_DETAIL_MOCK` — dettagli estesi per ogni candidato (dossier, note, timeline)
- `APPLICANT_STATS_MOCK` — statistiche aggregate calcolate dinamicamente dai mock

L'hook `useApplicant` implementa la logica che in produzione sarebbe una chiamata API:
- Filtraggio e ricerca lato client (simulando un endpoint `/candidates?search=...`)
- Paginazione con `page` e `pageSize`
- Latenza simulata con `setTimeout` (800ms default, 2500ms in modalita simulazione)

Il client HTTP (`useApiClient`) e gia pronto per un backend reale:
- Auto-injection Bearer token
- Gestione 401 (logout automatico + redirect a login)
- Gestione errori con alert
- Supporto GET, POST, PUT, DELETE

### Simulazione errori API

Due toggle nella Dashboard permettono di simulare scenari reali:
- **Simula Latenza** — aumenta il delay a 2.5s per verificare skeleton/loading
- **Simula Errore API** — tutte le chiamate lanciano un errore 500, mostrando alert di errore

Implementato tramite `ApiSimulationContext` letto dall'hook `useApplicant`.

---

## Gestione stato, loading ed errori

### State management

- **Redux** per stato globale: candidati, candidato selezionato, statistiche, paginazione, autenticazione
- **useState locale** per loading/errori nei componenti (pattern IIFE con `useEffect`)
- **Context** per funzionalita trasversali: tema, lingua, alert, modali, simulazione API

Il loading **non** vive nello store Redux — e gestito con `useState` nel componente che lo consuma. Motivazione: il loading e UI-specific, non business state.

### Loading states

- **Skeleton** per ogni sezione: `StatCardSkeleton`, `CandidateDetailSkeleton`, `ProfessionalDossierSkeleton`, `NotesSkeleton`, `TimelineSkeleton`, `StatusRecruitmentSkeleton`, `ApplicationDateSkeleton`, `JobPositionCardSkeleton`
- Visibili durante il caricamento iniziale e quando si cambia candidato

### Error states

- Ogni chiamata mock ha un `try/catch` che mostra un **alert** (toast notification) in caso di errore
- L'errore non rompe l'app: lo stato Redux resta consistente
- Su errore del dettaglio candidato, la selezione viene pulita (`selectCandidate(null)`) e si mostra l'**empty state**

### Empty states

- Lista candidati vuota (ricerca senza risultati): messaggio "Nessun candidato trovato"
- Nessun candidato selezionato: card con icona e messaggio "Nessun candidato selezionato"
- Note vuote: messaggio "Nessuna nota presente"
- Timeline vuota: messaggio "Nessun evento registrato"

---

## Gestione ruoli/autorizzazioni

Due ruoli implementati: **admin** e **viewer**.

| Funzionalita | Admin | Viewer |
|---|---|---|
| Visualizzare lista candidati | Si | Si |
| Filtrare e cercare | Si | Si |
| Vedere dettaglio candidato | Si | Si |
| Aggiungere note | Si | No (textarea nascosta) |
| Eliminare proprie note | Si | No (cestino nascosto) |
| Cambiare stato candidato | Si | No (bottoni disabilitati) |
| Accedere a Impostazioni | Si | No (voce menu nascosta) |

Implementazione:
- **Route-level**: `allowedRoles` nel config routes + `RouteGuard` che verifica il ruolo
- **Component-level**: prop `isAdmin` che controlla visibilita di textarea, bottoni, azioni
- **Hook `usePermissions`**: sistema permessi granulare (`can('edit_candidates')`, `canAll(...)`, `canAny(...)`)

### Conferme per azioni critiche

Le azioni distruttive richiedono conferma tramite **modale dialog**:
- **Eliminazione nota**: modale warning con "Elimina" / "Annulla"
- **Cambio stato candidato**: modale info con "Conferma" / "Annulla"

---

## Testing strategy

**132 test, 13 file, 0 fallimenti.**

### Approccio

Test organizzati su 3 livelli:

1. **Unit test** — reducer Redux in isolamento
2. **Integration test** — hook con store reale + context mockati
3. **Component test** — componenti renderizzati con provider, verifica DOM e interazioni

### Copertura per area

| Area | File test | N. test | Cosa verifica |
|---|---|---|---|
| **Auth reducer** | `authSlice.test.ts` | 9 | Stato iniziale, login, logout, restore, errori |
| **Auth hook** | `useAuth.test.tsx` | 13 | Login admin/viewer, credenziali errate (3 combinazioni), campi vuoti, logout, checkAuth, updateUser |
| **Applicant reducer** | `applicantSlice.test.ts` | 10 | loadCandidates, appendCandidates, loadStats, selectCandidate, array vuoti, null |
| **Applicant hook** | `useApplicant.test.tsx` | 19 | CRUD candidati, paginazione, ricerca vuota, errori API (alert, return null, stato consistente), note, timeline, cambio stato |
| **HTTP client** | `useApiClient.test.tsx` | 13 | 200/201, Bearer token, 401->logout, 404/500->alert, network error, timeout |
| **Login page** | `Login.test.tsx` | 11 | Form render, credenziali errate, campi vuoti (HTML required), login success, sessione scaduta |
| **Layout** | `Layout.test.tsx` | 5 | Sidebar admin vs viewer, toggle collapse |
| **Route guard** | `RouteGuard.test.tsx` | 7 | Redirect non autenticato, ruoli, spinner loading |
| **Ruoli** | `RoleBasedAccess.test.tsx` | 11 | Admin vede textarea/submit/delete, viewer no. Status admin enabled, viewer disabled |
| **Modali** | `ModalConfirmations.test.tsx` | 10 | Conferma/annulla elimina nota, conferma/annulla cambio stato |
| **Permessi** | `usePermissions.test.tsx` | 14 | RBAC: admin tutto, viewer solo read, can/canAll/canAny |
| **Alert** | `Alert.test.tsx` | 7 | Render, tipi, link, close |
| **Modal Dialog** | `ModalDialog.test.tsx` | 4 | Render, tipi, link, click |

### Principio guida

> Se il frontend non crasha, il test passa.

Per ogni errore API verifico: la funzione ritorna `null`/`false`, l'alert viene mostrato, lo stato Redux resta consistente, l'app non si rompe.

---

## Come ho usato l'AI

Claude Code (Claude Opus) e stato usato come copilota durante l'intero sviluppo:

- **Scaffolding iniziale**: struttura cartelle, provider tree, configurazione store
- **Implementazione componenti**: ho descritto il design target (screenshot/HTML di riferimento) e Claude ha generato i componenti seguendo le convenzioni del progetto
- **Mock data**: generazione di 37 candidati realistici con nomi, ruoli, score, timeline
- **Testing**: ho descritto i casi da testare e Claude ha scritto i test, eseguendoli e fixando i fallimenti iterativamente
- **Refactoring**: empty state, error handling, simulazione API, modali di conferma — descritti come requisiti, implementati da Claude
- **Debugging**: quando i test fallivano (es. mock i18n che ritornava `undefined`), Claude ha analizzato il DOM renderizzato e trovato il root cause

Ho sempre validato ogni scelta e rivisto il codice generato. Le decisioni architetturali (Redux vs useContext, loading nel componente vs nello store, struttura flat delle feature) sono state mie.

### Cartella `.claude/` — configurazione AI-assisted development

Il progetto include una cartella `.claude/` che configura il comportamento di Claude Code per questo specifico codebase:

```
.claude/
├── CLAUDE.md                    # Istruzioni principali: overview progetto, comandi, architettura
├── settings.json                # Permessi e configurazione tool
├── rules/                       # Regole che Claude segue automaticamente
│   ├── code-style.md            # Convenzioni TypeScript, naming, import
│   ├── react-patterns.md        # Pattern Redux, hook, context, lazy loading
│   ├── ui-components.md         # Accessibilita WCAG, colori, responsive, spaziatura
│   ├── i18n.md                  # Regole internazionalizzazione (lingue, file, pattern)
│   ├── testing-guidelines.md    # Checklist test: slice, hook, componenti, API client
│   └── api-patterns.md          # Pattern chiamate API
├── skills/                      # Comandi rapidi riutilizzabili
│   ├── translate/               # /translate — aggiunge chiavi i18n in tutte le lingue
│   ├── new-feature/             # /new-feature — scaffolding struttura feature Redux
│   ├── lint/                    # /lint — esegue ESLint
│   └── build/                   # /build — esegue build TypeScript + Vite
└── agents/                      # Agenti specializzati per task specifici
    ├── researcher/              # Esplora e analizza il codebase
    ├── code-reviewer/           # Review qualita e pattern
    ├── feature-builder/         # Costruisce nuove feature
    ├── qa-agent/                # Validazione e quality assurance
    └── debugger/                # Analisi e risoluzione bug
```

Questo approccio garantisce che ogni intervento dell'AI sia coerente con le convenzioni del progetto: naming, struttura file, accessibilita, traduzioni e pattern di test.

---

## Compromessi e cose lasciate fuori

- **Nessun backend reale**: tutto mockato. Il filtro/ricerca e la paginazione avvengono lato client, in produzione sarebbero server-side
- **Autenticazione semplificata**: login hardcoded senza JWT reale, senza refresh token, senza scadenza sessione
- **Nessun form di edit candidato**: si possono cambiare stato e note, ma non i dati anagrafici
- **Nessun upload file**: CV, foto profilo — mancanti
- **Test E2E assenti**: solo unit/integration/component test, nessun Cypress/Playwright
- **Nessuna PWA / offline support**
- **Accessibility**: buona base (aria-label, semantica, focus ring) ma non audit completo WCAG 2.1 AAA
- **Gestione completa candidato**: manca CRUD completo (creazione, modifica anagrafica, eliminazione candidato). Attualmente si possono solo cambiare stato e gestire note
- **Gestione azienda/cliente**: manca tutta la sezione dedicata all'azienda che cerca il candidato (anagrafica cliente, posizioni aperte per cliente, associazione candidato-azienda)

---

## Cosa cambierei andando in produzione

1. **Backend reale** con API REST o GraphQL, autenticazione JWT con refresh token
2. **Migrazione da mock a API reali**
3. **Test E2E** con Playwright per i flussi critici (login, cambio stato, aggiunta nota)
4. **Error boundary** a livello di route per catturare errori non gestiti senza crashare tutta l'app
5. **Monitoring**: Sentry per error tracking, analytics per user behavior
6. **CI/CD**: GitHub Actions con lint, test, build, deploy automatico. In locale, **Husky** per eseguire lint e test sui git hooks (pre-commit, pre-push) cosi da bloccare codice rotto prima che arrivi nel repository
7. **Storybook** per documentazione componenti e design system
8. **Lazy loading** piu aggressivo: split per feature, non solo per pagina
9. **Ottimizzazione performance**: `React.memo` dove serve. Per le liste, la paginazione con scroll infinito e i filtri server-side limitano gia il numero di elementi per chiamata (7-10), ma in caso di viste senza paginazione (es. dashboard riassuntive, report) si potrebbe valutare la virtualizzazione con react-window
10. **Accessibilita**: audit WCAG 2.1 AA completo, screen reader testing

---

## Evoluzione nei primi 90 giorni (ownership completa)

Le priorita dipendono dalle esigenze del progetto e del team. Di seguito un'indicazione di massima, da adattare man mano che il progetto cresce:

### Giorni 1-30: Infrastruttura e stabilita

- Definire e allineare gli ambienti (dev, test/staging, produzione) con variabili d'ambiente dedicate e configurazioni separate
- Setup CI/CD pipeline (lint + test + build + deploy preview per ogni PR) + Husky per git hooks locali (pre-commit, pre-push), automatizzando il deploy per ogni ambiente
- Migrazione da mock a API reali
- Aggiungere Error Boundaries per ogni route

### Giorni 30-60: Feature di prodotto

- Gestione completa candidato: CRUD anagrafica, upload CV, modifica dati
- Gestione azienda/cliente: anagrafica azienda che cerca personale, posizioni aperte, sistema di matching candidato-azienda basato su tag e competenze condivise
- Gestione ruoli e multi-utenza: attualmente i ruoli sono solo due (admin/viewer) con utenti hardcoded. Servirebbe un sistema completo con CRUD utenti, assegnazione ruoli dinamica da pannello admin, permessi granulari per risorsa (es. un recruiter vede solo i candidati delle sue posizioni), e un hook `usePermissions` evoluto che interroghi i permessi dal backend invece di averli definiti staticamente nel frontend
- Export dati (CSV/PDF) per report HR

### Giorni 60-90: Qualita e ottimizzazione

- Test E2E con Playwright per i flussi critici (simulano un utente reale nel browser: login, ricerca, cambio stato)
- Chunk splitting e ottimizzazione pacchetti per produzione
- Integrazione Sentry per error tracking in produzione
- Performance monitoring (Core Web Vitals, Lighthouse CI) per misurare tempi di caricamento e reattivita ad ogni deploy
- Documentazione architetturale per onboarding nuovi sviluppatori
