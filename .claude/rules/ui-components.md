# Linee Guida UI Components - Candidate Review Dashboard

Regole per creare nuove viste, pagine e componenti. Ogni componente DEVE rispettare queste linee guida.

## Accessibilita (WCAG 2.0)

### Obbligatorio

- Usare tag semantici HTML: `<article>`, `<section>`, `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- Ogni `<section>` deve avere `aria-label` descrittivo
- Icone decorative: `aria-hidden="true"`
- Icone interattive: `aria-label` descrittivo
- Bottoni: testo visibile O `aria-label`. MAI bottoni vuoti
- Immagini: `alt` sempre presente (vuoto `alt=""` se decorativa)
- Form: `<label>` collegata a `<input>` tramite `htmlFor`/`id`
- Link: testo descrittivo, MAI "clicca qui"
- Contrasto minimo testo: 4.5:1 (normali), 3:1 (grandi)

### Focus e Navigazione

- Tutti gli elementi interattivi raggiungibili via Tab
- Focus ring visibile (Tailwind: `focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`)
- Ordine di tab logico (non usare `tabIndex` positivi)

## Colori e Temi

### Regola principale: MAI colori hardcoded

```tsx
// NO - colori fissi che non cambiano con il tema
className="bg-[#4f46e5]"
className="text-[#333]"
className="border-[1px]"

// SI - token semantici e classi Tailwind
className="bg-primary-500"
className="text-text-primary"
className="border"
```

### Palette da usare

| Uso | Classe |
|---|---|
| Brand/Azioni principali | `primary-50` ... `primary-900` |
| Testo principale | `text-text-primary` (o `text-slate-800`) |
| Testo secondario | `text-text-secondary` (o `text-slate-600`) |
| Testo muted | `text-text-muted` (o `text-slate-400`) |
| Sfondo pagina | `bg-surface-page` |
| Sfondo card | `bg-white` + `border border-slate-200` |
| Sfondo hover | `bg-slate-50` |
| Success | `emerald-50/500/600` |
| Warning | `amber-50/500/600` |
| Error | `red-50/500/600` |
| Info | `blue-50/500/600` |

### Colori semantici per varianti

Quando un componente ha varianti di colore (es. StatCard, Badge), usare:
- `primary` - azioni principali, stato default (segue il tema)
- `amber` - in corso, attenzione
- `emerald` - completato, successo
- `indigo` - info, statistiche (fisso, non segue tema)

## Dimensioni e Spaziatura

### MAI valori arbitrari

```tsx
// NO
className="p-[13px]"
className="w-[340px]"
className="text-[10.5px]"
className="gap-[6px]"

// SI - scala Tailwind
className="p-3"        // 12px
className="w-80"       // 320px
className="text-xs"    // 12px
className="gap-1.5"    // 6px
```

### Scala spaziatura standard

| Token | Uso |
|---|---|
| `gap-4` / `p-4` | Spaziatura interna card |
| `gap-6` / `p-6` | Spaziatura sezioni |
| `space-y-8` | Spaziatura tra sezioni pagina |
| `mb-1` / `mt-1` | Micro-spaziatura testi correlati |

## Responsive

### Breakpoint obbligatori

Ogni layout a griglia deve avere almeno 2 breakpoint:

```tsx
// Pattern standard per stat cards / grid items
className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"

// Pattern standard per form a 2 colonne
className="grid grid-cols-1 gap-6 md:grid-cols-2"

// Pattern standard per contenuto con sidebar
className="flex flex-col gap-6 lg:flex-row"
```

### Mobile-first

Scrivere sempre mobile-first: la classe base e' per mobile, i breakpoint aggiungono complessita':

```tsx
// SI - mobile first
className="text-xl sm:text-2xl lg:text-3xl"
className="p-4 sm:p-6 lg:p-8"

// NO - desktop first
className="text-3xl sm:text-2xl"  // non ha senso ridurre
```

## Struttura Pagina Standard

```tsx
const MyPage = () => {
    const {t} = useTranslation();

    return (
        <div className="space-y-8">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
                    {t('mypage.title', 'Titolo')}
                </h1>
                <p className="mt-1 text-sm text-text-muted">
                    {t('mypage.subtitle', 'Descrizione')}
                </p>
            </header>

            {/* Sezione con label accessibile */}
            <section aria-label={t('mypage.section_label', 'Nome sezione')}>
                {/* contenuto */}
            </section>
        </div>
    );
};
```

## Card Standard

```tsx
<article className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
    {/* contenuto */}
</article>
```

## Componenti Riutilizzabili Disponibili

- `StatCard` - Card statistica con icona, valore, label, descrizione e variante colore
- `Alert` - Notifica con tipo (success/error/warning/info)
- `ModalDialog` - Dialog modale con azioni
- `Spinner` - Loading indicator
- `Avatar` - Avatar utente

## i18n

Ogni testo visibile DEVE usare `t()` con fallback italiano:

```tsx
{t('chiave.descrittiva', 'Testo italiano di fallback')}
```

## Transizioni

Usare solo durate Tailwind standard:
- `duration-150` - micro-interazioni (hover colore)
- `duration-200` - hover card, focus
- `duration-300` - apertura/chiusura, sidebar