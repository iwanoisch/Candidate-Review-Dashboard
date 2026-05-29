# Dashboard Roadmap - Target UI

Riferimento: HTML di design del 2026-05-29. Layout completo della dashboard candidati.

## Struttura Layout Principale

La pagina Dashboard ha 3 sezioni verticali:

### 1. Stat Cards (FATTO)
- Grid 2 col mobile / 4 col desktop
- 4 card: Candidati Totali, Sotto Valutazione, Assunti, Punteggio Medio
- Skeleton loader implementato

### 2. Layout a 2 colonne (DA FARE)
`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start`

#### Colonna Sinistra - Lista Candidati (`lg:col-span-5`)

**Barra Ricerca + Filtri** (card separata):
- Input search full-width con icona search (rounded-full)
- Placeholder: "Cerca per nome, email, ruolo, o parole chiave nelle note..."
- Filtri inline: Dipartimento (select), Stato (select), Ordina per (select)
- Stile filtri: bg-slate-50 border rounded-full px-3 py-1.5

**Lista Candidati** (card separata):
- Header: "Candidati (N)" con contatore
- Lista scrollabile (max-h-[580px] overflow-y-auto)
- Ogni candidato e' una card con:
  - Avatar (w-11 h-11 rounded-xl) con badge opzionale (top score indicator)
  - Nome (font-semibold, hover -> text-primary-600)
  - Badge esperienza ("8y exp" - font-mono)
  - Ruolo (text-xs text-slate-500)
  - Dipartimento + data registrazione
  - Score (font-mono, badge colorato in base al valore)
  - Status badge (colori diversi per stato)
  - Barra laterale sinistra colorata al hover (w-1)
- Candidato selezionato: border-primary-500 shadow-md ring-1, barra laterale primary-600

#### Colonna Destra - Dettaglio Candidato (`lg:col-span-7`)

**Header Candidato** (card):
- Avatar grande (w-16 h-16 rounded-2xl)
- Nome (text-xl font-bold) + status badge inline
- Ruolo + Dipartimento
- Email (cliccabile, con icona copy) + Telefono
- Box score "Match Overall" (bg-slate-50, font-mono text-2xl)

**Dossier Professionale** (card):
- Icona + titolo sezione
- Summary in box bg-slate-50 rounded-xl
- Griglia 3 colonne: Tech Capability, Comunicazione, Fit Culturale (stelle 1-5)
- Box "Perche lo consigliamo" (bg-emerald-50 border-emerald-100)

**Note & Feedback** (card):
- Contatore note nel titolo
- Form: textarea + bottone "Rilascia Nota" (solo admin)
- Lista note scrollabile (max-h-56):
  - Autore + ruolo badge (ADMIN/VIEWER) + data
  - Contenuto nota

**Pipeline Recruitment** (card, colonna destra interna):
- Grid 2 colonne con tutti gli stati come bottoni
- Stato corrente evidenziato (bg-primary-600 text-white)
- Altri stati: bg-slate-50 hover:bg-slate-100

**Data Candidatura** (card piccola):
- Icona calendario + data font-mono

**Timeline Storico** (card):
- Linea verticale (border-l-2 border-slate-100)
- Eventi con icone circolari colorate per tipo:
  - status_change: icona user-check, bg-primary-50
  - note_added: icona message-square, bg-amber-50
  - created: icona circle-plus, bg-blue-50
- Ogni evento: titolo, descrizione, autore + ruolo, data
- Scrollabile (max-h-72)

## Componenti da Creare

1. `FilterBar` - ricerca + filtri
2. `CandidateList` - lista scrollabile
3. `CandidateListItem` - singola card candidato
4. `CandidateDetail` - wrapper dettaglio
5. `CandidateHeader` - avatar + info + score
6. `CandidateDossier` - summary + skills + match reason
7. `CandidateNotes` - form + lista note
8. `CandidatePipeline` - griglia stati con cambio stato
9. `CandidateTimeline` - timeline eventi
10. `StatusBadge` - badge stato con colori (riutilizzabile)

## Status Badge Colors
- Applied -> bg-blue-50 text-blue-700 border-blue-200 ("Candidato")
- Screening -> bg-amber-50 text-amber-800 border-amber-200
- Interviewing -> bg-purple-50 text-purple-700 border-purple-200 ("Colloquio")
- Offered -> bg-pink-50 text-pink-700 border-pink-200 ("Offerta")
- Hired -> bg-emerald-50 text-emerald-700 border-emerald-200 ("Assunto")
- Rejected -> bg-rose-50 text-rose-700 border-rose-200 ("Scartato")

## Note Implementative
- brand-* nell'HTML di riferimento = primary-* nel nostro progetto
- font-display nell'HTML = non abbiamo questo font, usare font-sans con font-bold
- Tutti i testi devono passare per t() con fallback italiano
- Rispettare WCAG 2.0 (aria-label, semantica, contrasto)
- Usare solo classi Tailwind standard (no valori arbitrari)
- I dati vengono dal mock APPLICANT_DATA_MOCK e dallo store Redux
