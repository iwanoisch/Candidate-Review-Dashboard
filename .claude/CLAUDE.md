# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Candidate Review Dashboard** — Web application per la gestione di candidati in un processo di selezione.

Funzionalita principali:
- Lista candidati con filtri e ricerca
- Dettaglio candidato con timeline/storico
- Modifica stato del candidato
- Aggiunta note
- Gestione ruoli utente (admin, viewer)
- Stati di loading, errore ed empty state
- Dati mockati (nessun backend reale)

## Commands

- **Dev server:** `npm run dev` (runs on all interfaces with `host: true`)
- **Dev with lint:** `npm run dev:lint` (lints before starting dev server)
- **Build:** `npm run build` (TypeScript check + Vite build)
- **Lint:** `npm run lint`
- **Preview production build:** `npm run preview`

## Architecture

React 19 + TypeScript SPA using Vite, Tailwind CSS v4, and Redux Toolkit with redux-persist.

### Entry Flow
`index.html` → `src/Main.tsx` (provider tree) → `src/AppRouting.tsx` (BrowserRouter + routes)

### Provider Hierarchy (Main.tsx)
Redux Provider → PersistGate → ThemeProvider → LanguageProvider → AlertProvider → ModalDialogProvider → AppRouting

### State Management
- **Store:** `src/store/store.ts` — Redux Toolkit with redux-persist (only `auth` slice is persisted to localStorage)
- **Slices:** Registered in `src/features/rootReducers.ts`. Currently: `init`, `auth`
- **Typed hooks:** `useAppDispatch`, `useAppSelector` exported from store

### Auth System
- `src/features/auth/slice/authSlice.ts` — Redux slice for auth state (token, user, isAuthenticated)
- `src/features/auth/hooks/useAuth.ts` — Hook providing login, logout, checkAuth, updateUser
- `src/components/layout/Layout.tsx` — Route guard logic: redirects unauthenticated users, skips guard for `/login`
- Auth token stored in Redux (persisted) and user data also in localStorage under `auth_user`
- Two roles: `admin` (full access) and `viewer` (read-only)
- Has a hardcoded dev login bypass (`admin@gmail.it` / `admin`)

### API / Mock Data
- `src/hooks/useApiClient.ts` — Custom fetch wrapper with auto Bearer token injection, 401 handling (auto-logout + redirect to login), and alert-based error display
- No real backend: the app uses mock data to simulate API responses
- Base URL from `VITE_API_BASE_URL` env var (can point to mock server or be unused with local mocks)

### i18n
- `src/i18n.ts` — i18next with HTTP backend, default language Italian (`it`)
- Supported: `it`, `en`, `ar`
- Translation files: `public/locales/{lng}/translation.json`
- Per-user language preference stored/loaded via `LanguageProvider`

### Theming
`src/common/theme-selector/` — Context-based theme system with per-user theme persistence

### Shared UI Components
Located in `src/common/`: Alert, ModalDialog, Spinner, SideBar, Avatar, ThemeSelector, LanguageSelector. Each follows a pattern of `Context + Provider + useHook + types`.

### Navigation
- Routes defined in `AppRouting.tsx`. Lazy-loaded pages: Dashboard, NotFound. Eager: Login
- Sidebar menu items in `src/utility/menu-items.type.ts` with role-based visibility support (`UserRole: 'admin' | 'viewer'`)

### Path Aliases
- `@` → `./src`
- `@assets` → `./public/assets`

### Build
Vite config has manual chunk splitting (react-vendor, state-management, ui-libs, i18n) and copies `static/.htaccess` to dist for Apache SPA routing.

## Environment
Copy `.env.example` to `.env`. Required variable: `VITE_API_BASE_URL`.
