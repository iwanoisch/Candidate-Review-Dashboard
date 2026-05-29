import type {Candidate} from "../features/applicant/applicant.type";

export const APPLICANT_DATA_MOCK: Candidate[] = [
    {
        "id": "cand-1",
        "name": "Alessandro Rossi",
        "email": "alessandro.rossi@email.it",
        "phone": "+39 347 123 4567",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Senior Full Stack Developer",
        "department": "Engineering",
        "score": 92,
        "experienceYears": 8,
        "appliedDate": "2026-05-15",
        "status": "Interviewing",
        "summary": "Developer esperto e versatile, con forte competenza in React, Node.js e architetture Cloud (AWS). Ha guidato con successo la migrazione di piattaforme monolitiche legacy verso soluzioni a micro-frontend in contesti aziendali complessi.",
        "matchReason": "Perfetto fit tecnico. Ha superato brillantemente la nostra prova di Live System Design dimostrando padronanza di pattern di caching, scalabilità e database Relazionali/NoSQL.",
        "tags": ["React", "NodeJS", "System Design", "AWS"],
        "notes": [
            {
                "id": "note-1-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-16",
                "content": "Ottimo screening iniziale. Motivato, risponde perfettamente alle aspettative salariali e ha un preavviso di sole 2 settimane. Procediamo subito con il colloquio tecnico."
            },
            {
                "id": "note-1-2",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-22",
                "content": "La prova tecnica è andata egregiamente. Ha spiegato molto bene la gestione dello stato in ambienti concorrenti. Ha espresso forte preferenza per Redux Toolkit!"
            }
        ],
        "timeline": [
            {
                "id": "tl-1-1",
                "date": "2026-05-15",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata per il ruolo di Senior Full Stack Developer.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-1-2",
                "date": "2026-05-16",
                "type": "status_change",
                "title": "Avanzamento a Screening",
                "description": "Stato modificato da Applied a Screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Applied", "newStatus": "Screening" }
            },
            {
                "id": "tl-1-3",
                "date": "2026-05-16",
                "type": "note_added",
                "title": "Nota di HR Inserita",
                "description": "\"Ottimo screening iniziale...\"",
                "author": "Sandro P. (HR)",
                "authorRole": "admin"
            },
            {
                "id": "tl-1-4",
                "date": "2026-05-20",
                "type": "status_change",
                "title": "Avanzamento a In Colloquio",
                "description": "Stato modificato da Screening a Interviewing per colloquio tecnico.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Screening", "newStatus": "Interviewing" }
            },
            {
                "id": "tl-1-5",
                "date": "2026-05-22",
                "type": "note_added",
                "title": "Nota Tecnica Aggiunta",
                "description": "\"La prova tecnica è andata egregiamente...\"",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin"
            }
        ]
    },
    {
        "id": "cand-2",
        "name": "Elena Bianchi",
        "email": "elena.bianchi@techpoint.org",
        "phone": "+39 333 987 6543",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Senior Product Manager",
        "department": "Product",
        "score": 95,
        "experienceYears": 10,
        "appliedDate": "2026-05-20",
        "status": "Offered",
        "summary": "Product Leader specializzata nello sviluppo di prodotti SaaS B2B. Altamente orientata alle metriche di adozione del prodotto, user research approfondita ed allineamento strategico tra team commerciali ed ingegneristici.",
        "matchReason": "Leadership comunicativa eccezionale. Ha gestito roadmap complesse portando un incremento del 40% di MRR nel suo ultimo incarico.",
        "tags": ["B2B SaaS", "Roadmapping", "Agile", "Product Analytics"],
        "notes": [
            {
                "id": "note-2-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-21",
                "content": "Forte intesa immediata sul piano culturale. Ha descritto casi reali in cui ha detto \"no\" a feature complesse per mantenere focalizzata la strategia."
            },
            {
                "id": "note-2-2",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "date": "2026-05-25",
                "content": "Presentazione del product case fantastica. Chiara, concisa e supportata da dati numerici. Mandiamo l’offerta economica oggi stesso."
            }
        ],
        "timeline": [
            {
                "id": "tl-2-1",
                "date": "2026-05-20",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-2-2",
                "date": "2026-05-21",
                "type": "status_change",
                "title": "Spostata in Screening",
                "description": "Stato modificato da Applied a Screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Applied", "newStatus": "Screening" }
            },
            {
                "id": "tl-2-3",
                "date": "2026-05-21",
                "type": "note_added",
                "title": "Feedback HR",
                "description": "\"Forte intesa immediata...\"",
                "author": "Sandro P. (HR)",
                "authorRole": "admin"
            },
            {
                "id": "tl-2-4",
                "date": "2026-05-23",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Stato modificato da Screening a Interviewing.",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Screening", "newStatus": "Interviewing" }
            },
            {
                "id": "tl-2-5",
                "date": "2026-05-25",
                "type": "note_added",
                "title": "Feedback Progetto CPO",
                "description": "\"Presentazione del product case fantastica...\"",
                "author": "Marco D. (CPO)",
                "authorRole": "admin"
            },
            {
                "id": "tl-2-6",
                "date": "2026-05-26",
                "type": "status_change",
                "title": "Offerta Inviata",
                "description": "Contratto per Senior Product Manager proposto formalmente.",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Interviewing", "newStatus": "Offered" }
            }
        ]
    },
    {
        "id": "cand-3",
        "name": "Luca Moretti",
        "email": "luca.moretti.design@gmail.com",
        "phone": "+39 328 111 2222",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "UI/UX Designer",
        "department": "Design",
        "score": 88,
        "experienceYears": 4,
        "appliedDate": "2026-05-22",
        "status": "Screening",
        "summary": "Designer focalizzato su web ed interfacce mobile. Esperto in creazione e manutenzione di Figma Design Systems evoluti, micro-interazioni coinvolgenti ed attento sostenitore degli standard di accessibilità WCAG.",
        "matchReason": "Portfolio di eccellente fattura, pulito e documentato molto approfonditamente. Dimostra orientamento sia estetico che funzionale.",
        "tags": ["Figma", "Design Systems", "Micro-interazioni", "WCAG"],
        "notes": [
            {
                "id": "note-3-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-23",
                "content": "Fatto primo touchpoint. Dimostra ottime capacità espositive e dedizione ai dettagli. In attesa del portfoli review con il Lead Designer."
            }
        ],
        "timeline": [
            {
                "id": "tl-3-1",
                "date": "2026-05-22",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura ricevuta via LinkedIn Referral.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-3-2",
                "date": "2026-05-23",
                "type": "status_change",
                "title": "Passato a Screening",
                "description": "Spostato in Screening iniziale.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Applied", "newStatus": "Screening" }
            },
            {
                "id": "tl-3-3",
                "date": "2026-05-23",
                "type": "note_added",
                "title": "Nota Touchpoint HR",
                "description": "\"Fatto primo touchpoint...\"",
                "author": "Sandro P. (HR)",
                "authorRole": "admin"
            }
        ]
    },
    {
        "id": "cand-4",
        "name": "Giulia Colombo",
        "email": "giulia.colombo@marketinglab.com",
        "phone": "+39 335 444 5555",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Growth Marketing Specialist",
        "department": "Marketing",
        "score": 78,
        "experienceYears": 3,
        "appliedDate": "2026-05-23",
        "status": "Applied",
        "summary": "Esperta di marketing a performance con focus su acquisizione utenti B2C. Esperta nell’approccio scientifico tramite test A/B rigorosi, scalabilità di campagne Paid Search/Social, e automazione di campagne email newsletter.",
        "matchReason": "Solido approccio analitico ai funnel di conversione. Perfetto per espandere il canale di traffico organico e a pagamento.",
        "tags": ["SEO", "Google Ads", "A/B Testing", "Growth Funnel"],
        "notes": [],
        "timeline": [
            {
                "id": "tl-4-1",
                "date": "2026-05-23",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea registrata sul sito web aziendale.",
                "author": "System",
                "authorRole": "viewer"
            }
        ]
    },
    {
        "id": "cand-5",
        "name": "Markus Vance",
        "email": "markus.vance@scala-world.net",
        "phone": "+1 (555) 789-0123",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Principal Cloud Architect",
        "department": "Engineering",
        "score": 98,
        "experienceYears": 12,
        "appliedDate": "2026-05-10",
        "status": "Hired",
        "summary": "Ingegnere e architetto software specializzato in infrastrutture distribuite, sistemi a tolleranza di errore ed elaborazione flussi dati real-time. Forte contributore a progetti Software Open Source correlati al Cloud Native computing.",
        "matchReason": "Talento eccezionale a livello globale. Ha superato brillantemente ogni sessione di intervista con unanimità assoluta del comitato di valutazione.",
        "tags": ["Kubernetes", "Scala", "Distributed Systems", "Go"],
        "notes": [
            {
                "id": "note-5-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-11",
                "content": "Ottimo background. Richiede rilocazione, approvata dal budget."
            },
            {
                "id": "note-5-2",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "date": "2026-05-18",
                "content": "Uno dei migliori candidati mai visti. Proposta contrattuale accettata ufficialmente ieri! Assunto!"
            }
        ],
        "timeline": [
            {
                "id": "tl-5-1",
                "date": "2026-05-10",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-5-2",
                "date": "2026-05-11",
                "type": "status_change",
                "title": "Passato in Screening",
                "description": "Stato modificato da Applied a Screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Applied", "newStatus": "Screening" }
            },
            {
                "id": "tl-5-3",
                "date": "2026-05-11",
                "type": "note_added",
                "title": "Verifica Budget Rilocazione",
                "description": "\"Ottimo background...\"",
                "author": "Sandro P. (HR)",
                "authorRole": "admin"
            },
            {
                "id": "tl-5-4",
                "date": "2026-05-14",
                "type": "status_change",
                "title": "Spostato in Colloqui",
                "description": "Interviste programmate con VP",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Screening", "newStatus": "Interviewing" }
            },
            {
                "id": "tl-5-5",
                "date": "2026-05-16",
                "type": "status_change",
                "title": "Offerta Proposta",
                "description": "Inviato pacchetto offerta.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Interviewing", "newStatus": "Offered" }
            },
            {
                "id": "tl-5-6",
                "date": "2026-05-18",
                "type": "status_change",
                "title": "Assunto!",
                "description": "Offerta firmata. Data inizio fissata per Lunedì 1 Luglio 2026.",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Offered", "newStatus": "Hired" }
            },
            {
                "id": "tl-5-7",
                "date": "2026-05-18",
                "type": "note_added",
                "title": "Contratto Firmato",
                "description": "\"Uno dei migliori candidati...\"",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin"
            }
        ]
    },
    {
        "id": "cand-6",
        "name": "Sofia Esposito",
        "email": "sofia.esposito@outlook.it",
        "phone": "+39 349 999 8888",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Junior Frontend Developer",
        "department": "Engineering",
        "score": 62,
        "experienceYears": 1,
        "appliedDate": "2026-05-18",
        "status": "Rejected",
        "summary": "Sviluppatrice motivata che compie i primi solidi passi con React e CSS. Laureata triennale in Informatica, ha dimostrato notevole passione nei suoi progetti personali su Github.",
        "matchReason": "Profilo Junior promettente, ma non adatto alla nostra attuale posizione Senior aperta, che necessita di autonomia immediata su architetture a microservizi.",
        "tags": ["Eager to Learn", "React Basics", "HTML & CSS"],
        "notes": [
            {
                "id": "note-6-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-19",
                "content": "Sofia ha ottima energia, ma ammette di avere zero competenze con database o backend. Rifiutiamo con garbo suggerendole di candidarsi nuovamente tra un anno."
            }
        ],
        "timeline": [
            {
                "id": "tl-6-1",
                "date": "2026-05-18",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Sofia ha inviato la sua candidatura.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-6-2",
                "date": "2026-05-19",
                "type": "note_added",
                "title": "Feedback Screening HR",
                "description": "\"Sofia ha ottima energia...\"",
                "author": "Sandro P. (HR)",
                "authorRole": "admin"
            },
            {
                "id": "tl-6-3",
                "date": "2026-05-19",
                "type": "status_change",
                "title": "Esito Scartato",
                "description": "Stato modificato da Applied a Rejected con email di feedback costruttivo inviata.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Applied", "newStatus": "Rejected" }
            }
        ]
    },
    {
        "id": "cand-7",
        "name": "Federico Ricci",
        "email": "f.ricci@salesforce.it",
        "phone": "+39 320 777 6666",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Enterprise Account Executive",
        "department": "Sales",
        "score": 87,
        "experienceYears": 7,
        "appliedDate": "2026-05-12",
        "status": "Interviewing",
        "summary": "Professionista delle vendite orientato ai risultati, con solida esperienza commerciale in mercati SaaS Enterprise ad alto valore di transazione (ACV > €100k). Eccellente con negoziazioni multilivello.",
        "matchReason": "Notevole sicurezza sul palco e durante le presentazioni di vendita. Ha gestito lead di grandi istituti finanziari in Italia.",
        "tags": ["Sales Prospecting", "SaaS Licensing", "Negotiation", "CRM"],
        "notes": [
            {
                "id": "note-7-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-13",
                "content": "Ha gestito transazioni molto rilevanti. Motivazione alta. Programmiamo intervista con il VP di Sales."
            }
        ],
        "timeline": [
            {
                "id": "tl-7-1",
                "date": "2026-05-12",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Ricevuto profilo da agenzia di headhunting.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-7-2",
                "date": "2026-05-13",
                "type": "status_change",
                "title": "Screening Completato",
                "description": "Spostato in Screening iniziale.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Applied", "newStatus": "Screening" }
            },
            {
                "id": "tl-7-3",
                "date": "2026-05-13",
                "type": "note_added",
                "title": "Nota Screening Commerciale",
                "description": "\"Ha gestito transazioni molto rilevanti...\"",
                "author": "Sandro P. (HR)",
                "authorRole": "admin"
            },
            {
                "id": "tl-7-4",
                "date": "2026-05-15",
                "type": "status_change",
                "title": "Spostato in Interviewing",
                "description": "Organizzato colloquio conoscitivo commerciale.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": { "oldStatus": "Screening", "newStatus": "Interviewing" }
            }
        ]
    }
]
