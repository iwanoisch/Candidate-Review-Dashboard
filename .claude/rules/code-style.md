# Convenzioni di Codice - Candidate Review Dashboard

## TypeScript

- Usare tipi espliciti per parametri e return delle funzioni
- Preferire `interface` a `type` per oggetti
- I file di tipi seguono il pattern `nomeFeature.type.ts`
- Variabili inutilizzate devono essere prefissate con `_`

## Naming Conventions

- **Componenti React**: PascalCase (es. `CandidateCard.tsx`)
- **Hook**: camelCase con prefisso `use` (es. `useCandidates.ts`)
- **Slices Redux**: camelCase con suffisso `Slice.ts` (es. `candidatesSlice.ts`)
- **Types**: camelCase con suffisso `.type.ts` (es. `candidates.type.ts`)

## Import

Usare import relativi con `../`:
```typescript
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {useApiClient} from "../../../hooks/useApiClient.ts";
```

## Struttura Componenti

```typescript
// 1. Import esterni
import React from 'react';

// 2. Import interni relativi
import { useAuth } from '../../../features/auth/hooks/useAuth';

// 3. Import tipi
import type { CandidateProps } from './Candidate.type';

// 4. Componente
export const CandidateCard: React.FC<CandidateProps> = ({ name }) => {
  return <div>{name}</div>;
};
```

## ESLint

Il progetto usa ESLint. Prima di committare:
```bash
npm run lint
```