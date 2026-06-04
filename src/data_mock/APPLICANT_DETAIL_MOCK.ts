import type {CandidateDetail} from "../features/applicant/applicant.type";

export const APPLICANT_DETAIL_MOCK: Record<string, CandidateDetail> = {
    "cand-1": {
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
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 5,
                "maxScore": 5
            }
        ],
        "notes": null,
        "timeline": null,
        "jobPosition": {
            "description": "Responsabile dell'evoluzione delle nostre piattaforme web, ottimizzando le performance client-side e gestendo flussi API robusti su infrastruttura Cloud.",
            "responsibilities": [
                "Ingegnerizzare moduli web flessibili e riutilizzabili con React e TypeScript.",
                "Progettare e connettere RESTful API e database integrando logiche di caching avanzate.",
                "Guidare la transizione ad architetture scalabili per carichi di lavoro ad alta concorrenza."
            ],
            "requirements": [
                "5+ anni di esperienza avanzata su ecosistema React, Node.js e database relazionali.",
                "Padronanza avanzata di metodologie CI/CD e caching strutturato (Redis/Memcached).",
                "Spiccate capacità di System Design e refactoring di codice legacy."
            ]
        }
    },
    "cand-2": {
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
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 5,
                "maxScore": 5
            }
        ],
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
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
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
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
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
                "meta": {
                    "oldStatus": "Interviewing",
                    "newStatus": "Offered"
                }
            }
        ],
        "jobPosition": {
            "description": "Guida strategica del ciclo di vita del prodotto SaaS B2B, dall'ideazione al lancio.",
            "responsibilities": [
                "Definire e prioritizzare la roadmap prodotto basandosi su dati e feedback utenti.",
                "Collaborare con Engineering e Design per deliverare feature ad alto impatto.",
                "Monitorare metriche di adozione, retention e MRR."
            ],
            "requirements": [
                "7+ anni di esperienza in product management su prodotti SaaS B2B.",
                "Esperienza in user research, product analytics e metodologie Agile.",
                "Capacità di gestire stakeholder multipli e decisioni data-driven."
            ]
        }
    },
    "cand-3": {
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
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
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
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
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
        ],
        "jobPosition": {
            "description": "Progettazione di interfacce digitali accessibili e coinvolgenti, con focus su design system scalabili.",
            "responsibilities": [
                "Creare e mantenere un Design System Figma evoluto e documentato.",
                "Condurre user research e usability testing.",
                "Garantire conformità WCAG 2.1 AA su tutte le interfacce."
            ],
            "requirements": [
                "3+ anni di esperienza in UI/UX design.",
                "Padronanza di Figma e prototyping.",
                "Conoscenza degli standard di accessibilità WCAG."
            ]
        }
    },
    "cand-4": {
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
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
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
        ],
        "jobPosition": {
            "description": "Gestione e ottimizzazione delle campagne di acquisizione utenti B2C con approccio data-driven.",
            "responsibilities": [
                "Pianificare e ottimizzare campagne Paid Search e Social Ads.",
                "Implementare test A/B su landing page e funnel.",
                "Automatizzare flussi di email marketing."
            ],
            "requirements": [
                "3+ anni di esperienza in growth/performance marketing.",
                "Competenze in Google Ads, Meta Ads e analytics.",
                "Approccio analitico ai dati di conversione."
            ]
        }
    },
    "cand-5": {
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
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 5,
                "maxScore": 5
            }
        ],
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
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
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
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            },
            {
                "id": "tl-5-5",
                "date": "2026-05-16",
                "type": "status_change",
                "title": "Offerta Proposta",
                "description": "Inviato pacchetto offerta.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Interviewing",
                    "newStatus": "Offered"
                }
            },
            {
                "id": "tl-5-6",
                "date": "2026-05-18",
                "type": "status_change",
                "title": "Assunto!",
                "description": "Offerta firmata. Data inizio fissata per Lunedì 1 Luglio 2026.",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Offered",
                    "newStatus": "Hired"
                }
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
        ],
        "jobPosition": {
            "description": "Progettazione di infrastrutture cloud distribuite ad alta disponibilità per sistemi mission-critical.",
            "responsibilities": [
                "Architettare soluzioni cloud-native scalabili su AWS/GCP.",
                "Definire standard di sicurezza e disaster recovery.",
                "Mentoring del team engineering."
            ],
            "requirements": [
                "10+ anni di esperienza in architetture distribuite e cloud.",
                "Certificazioni AWS/GCP e Kubernetes in produzione.",
                "Contributi a progetti open source cloud-native."
            ]
        }
    },
    "cand-6": {
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
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 2,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
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
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Rejected"
                }
            }
        ],
        "jobPosition": {
            "description": "Supporto allo sviluppo frontend con opportunità di crescita in un team senior.",
            "responsibilities": [
                "Sviluppare componenti UI con React.",
                "Scrivere codice HTML/CSS semantico e accessibile.",
                "Partecipare a code review e pair programming."
            ],
            "requirements": [
                "Laurea in Informatica o equivalente.",
                "Conoscenza base di React, HTML5 e CSS3.",
                "Motivazione ad apprendere in contesto enterprise."
            ]
        }
    },
    "cand-7": {
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
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
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
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
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
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            }
        ],
        "jobPosition": {
            "description": "Gestione del ciclo di vendita enterprise per clienti ad alto valore nel mercato SaaS.",
            "responsibilities": [
                "Gestire pipeline enterprise con ACV > 100k euro.",
                "Condurre presentazioni e negoziazioni C-level.",
                "Coordinare con pre-sales e customer success."
            ],
            "requirements": [
                "5+ anni di esperienza in vendite enterprise SaaS B2B.",
                "Track record di target raggiunti.",
                "Eccellenti capacità di negoziazione."
            ]
        }
    },
    "cand-8": {
        "id": "cand-8",
        "name": "Valentina Ferretti",
        "email": "v.ferretti@devstudio.it",
        "phone": "+39 340 222 3333",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "DevOps Engineer",
        "department": "Engineering",
        "score": 91,
        "experienceYears": 6,
        "appliedDate": "2026-05-24",
        "status": "Screening",
        "summary": "Specialista DevOps con forte esperienza in CI/CD, Terraform e ambienti multi-cloud. Ha automatizzato pipeline di deploy riducendo i tempi di rilascio del 70%.",
        "matchReason": "Ottima padronanza di infrastrutture cloud ibride. Perfetta per il nostro progetto di migrazione AWS/GCP.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-8-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-25",
                "content": "Profilo tecnico molto solido. Programmiamo colloquio con il team infrastruttura."
            }
        ],
        "timeline": [
            {
                "id": "tl-8-1",
                "date": "2026-05-24",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-8-2",
                "date": "2026-05-25",
                "type": "status_change",
                "title": "Passata in Screening",
                "description": "Stato modificato da Applied a Screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "Automazione delle pipeline CI/CD e gestione infrastrutture multi-cloud.",
            "responsibilities": [
                "Progettare pipeline CI/CD automatizzate.",
                "Gestire infrastrutture con Terraform e Docker/Kubernetes.",
                "Implementare monitoring e incident response."
            ],
            "requirements": [
                "5+ anni di esperienza in DevOps.",
                "Competenze in Docker, Kubernetes e Terraform.",
                "Esperienza multi-cloud AWS/GCP."
            ]
        }
    },
    "cand-9": {
        "id": "cand-9",
        "name": "Marco De Luca",
        "email": "marco.deluca@innovate.io",
        "phone": "+39 331 444 5555",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Backend Developer",
        "department": "Engineering",
        "score": 84,
        "experienceYears": 5,
        "appliedDate": "2026-05-21",
        "status": "Interviewing",
        "summary": "Sviluppatore backend specializzato in architetture a microservizi con Java e Spring Boot. Esperienza significativa con sistemi event-driven e message broker.",
        "matchReason": "Competenze solide su Kafka e architetture distribuite. Buon fit per il team backend.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-9-1",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-23",
                "content": "Buon colloquio tecnico. Conosce bene i pattern CQRS e Event Sourcing."
            }
        ],
        "timeline": [
            {
                "id": "tl-9-1",
                "date": "2026-05-21",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-9-2",
                "date": "2026-05-22",
                "type": "status_change",
                "title": "In Screening",
                "description": "Stato modificato da Applied a Screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            },
            {
                "id": "tl-9-3",
                "date": "2026-05-23",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Stato modificato da Screening a Interviewing.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            }
        ],
        "jobPosition": {
            "description": "Sviluppo di microservizi backend con Java e Spring Boot in architetture event-driven.",
            "responsibilities": [
                "Implementare microservizi con Spring Boot e Kafka.",
                "Ottimizzare gestione dati su database relazionali e NoSQL.",
                "Implementare pattern CQRS e Event Sourcing."
            ],
            "requirements": [
                "4+ anni con Java e Spring Boot.",
                "Conoscenza di microservizi e message broker.",
                "Esperienza con PostgreSQL e MongoDB."
            ]
        }
    },
    "cand-10": {
        "id": "cand-10",
        "name": "Chiara Rinaldi",
        "email": "chiara.rinaldi@techcorp.com",
        "phone": "+39 345 666 7777",
        "avatar": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Data Analyst",
        "department": "Product",
        "score": 76,
        "experienceYears": 3,
        "appliedDate": "2026-05-25",
        "status": "Applied",
        "summary": "Data analyst con esperienza in Python, SQL e strumenti di business intelligence. Capacita di trasformare dati grezzi in insight azionabili per il business.",
        "matchReason": "Buon profilo analitico. Da valutare competenze su strumenti di data visualization avanzati.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [],
        "timeline": [
            {
                "id": "tl-10-1",
                "date": "2026-05-25",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea.",
                "author": "System",
                "authorRole": "viewer"
            }
        ],
        "jobPosition": {
            "description": "Trasformazione di dati grezzi in insight azionabili per decisioni strategiche.",
            "responsibilities": [
                "Analizzare dataset complessi e produrre report.",
                "Creare dashboard interattive con strumenti BI.",
                "Definire metriche di successo con product e engineering."
            ],
            "requirements": [
                "2+ anni in data analysis.",
                "Python, SQL e data visualization.",
                "Comunicare insight complessi in modo chiaro."
            ]
        }
    },
    "cand-11": {
        "id": "cand-11",
        "name": "Andrea Colombo",
        "email": "a.colombo@startup.dev",
        "phone": "+39 338 888 9999",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Mobile Developer",
        "department": "Engineering",
        "score": 89,
        "experienceYears": 7,
        "appliedDate": "2026-05-19",
        "status": "Offered",
        "summary": "Sviluppatore mobile esperto in React Native e Swift. Ha pubblicato app con milioni di download su App Store e Play Store.",
        "matchReason": "Portfolio eccezionale. La sua esperienza con app ad alto traffico e' esattamente cio che cerchiamo.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-11-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-20",
                "content": "Colloquio andato benissimo. Mandiamo offerta."
            },
            {
                "id": "note-11-2",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "date": "2026-05-24",
                "content": "Offerta inviata. In attesa di risposta."
            }
        ],
        "timeline": [
            {
                "id": "tl-11-1",
                "date": "2026-05-19",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-11-2",
                "date": "2026-05-20",
                "type": "status_change",
                "title": "Screening completato",
                "description": "Passato direttamente a colloquio.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Interviewing"
                }
            },
            {
                "id": "tl-11-3",
                "date": "2026-05-24",
                "type": "status_change",
                "title": "Offerta inviata",
                "description": "Proposta contrattuale inviata.",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Interviewing",
                    "newStatus": "Offered"
                }
            }
        ],
        "jobPosition": {
            "description": "Sviluppo di app mobile cross-platform ad alto traffico con focus su performance e UX nativa.",
            "responsibilities": [
                "Sviluppare app React Native per iOS e Android.",
                "Ottimizzare performance e gestione memoria.",
                "Implementare offline-first e sync dati."
            ],
            "requirements": [
                "5+ anni in sviluppo mobile.",
                "App pubblicate con alto numero di download.",
                "CI/CD mobile e distribuzione enterprise."
            ]
        }
    },
    "cand-12": {
        "id": "cand-12",
        "name": "Sara Benedetti",
        "email": "sara.b@uxlab.design",
        "phone": "+39 347 111 2222",
        "avatar": "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Product Designer",
        "department": "Design",
        "score": 93,
        "experienceYears": 9,
        "appliedDate": "2026-05-17",
        "status": "Hired",
        "summary": "Product designer senior con focus su design system enterprise. Ha costruito e mantenuto design system utilizzati da oltre 200 sviluppatori.",
        "matchReason": "Esperienza rara nella costruzione di design system scalabili. Perfetta per guidare il nostro team design.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 5,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-12-1",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "date": "2026-05-20",
                "content": "Presentazione portfolio straordinaria. Assumiamo subito."
            }
        ],
        "timeline": [
            {
                "id": "tl-12-1",
                "date": "2026-05-17",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Referral interno.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-12-2",
                "date": "2026-05-20",
                "type": "status_change",
                "title": "Assunta",
                "description": "Offerta accettata immediatamente.",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Interviewing",
                    "newStatus": "Hired"
                }
            }
        ],
        "jobPosition": {
            "description": "Guida del team design nella costruzione di un design system enterprise scalabile.",
            "responsibilities": [
                "Costruire e evolvere il design system aziendale.",
                "Condurre user research e definire pattern.",
                "Collaborare con engineering per implementazione pixel-perfect."
            ],
            "requirements": [
                "7+ anni in product design.",
                "Design system scalabili.",
                "Figma, user research e accessibilità."
            ]
        }
    },
    "cand-13": {
        "id": "cand-13",
        "name": "Tommaso Galli",
        "email": "t.galli@securityfirst.it",
        "phone": "+39 320 333 4444",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Security Engineer",
        "department": "Engineering",
        "score": 85,
        "experienceYears": 6,
        "appliedDate": "2026-05-22",
        "status": "Screening",
        "summary": "Ingegnere della sicurezza con certificazioni CISSP e CEH. Esperienza in penetration testing, audit di sicurezza e compliance GDPR.",
        "matchReason": "Competenze di sicurezza molto richieste. Profilo ideale per rafforzare il team security.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-13-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-23",
                "content": "Certificazioni verificate. Procediamo con screening tecnico."
            }
        ],
        "timeline": [
            {
                "id": "tl-13-1",
                "date": "2026-05-22",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura via LinkedIn.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-13-2",
                "date": "2026-05-23",
                "type": "status_change",
                "title": "In Screening",
                "description": "Stato modificato da Applied a Screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "Protezione di infrastrutture e applicazioni tramite penetration testing e audit di sicurezza.",
            "responsibilities": [
                "Condurre penetration testing regolari.",
                "Implementare policy GDPR-compliant.",
                "Gestire incident response e vulnerability management."
            ],
            "requirements": [
                "5+ anni in cybersecurity.",
                "Certificazioni CISSP e/o CEH.",
                "Cloud security e compliance GDPR."
            ]
        }
    },
    "cand-14": {
        "id": "cand-14",
        "name": "Laura Martini",
        "email": "laura.martini@contentpro.com",
        "phone": "+39 333 555 6666",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Content Strategist",
        "department": "Marketing",
        "score": 72,
        "experienceYears": 4,
        "appliedDate": "2026-05-26",
        "status": "Applied",
        "summary": "Content strategist con esperienza in SEO copywriting, content marketing B2B e gestione editoriale multi-canale.",
        "matchReason": "Buone competenze di scrittura tecnica. Da verificare esperienza su contenuti SaaS.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [],
        "timeline": [
            {
                "id": "tl-14-1",
                "date": "2026-05-26",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea via sito.",
                "author": "System",
                "authorRole": "viewer"
            }
        ],
        "jobPosition": {
            "description": "Strategia di content marketing B2B con focus su SEO e generazione di lead qualificati.",
            "responsibilities": [
                "Pianificare calendario editoriale multi-canale.",
                "Scrivere contenuti tecnici ottimizzati SEO.",
                "Analizzare performance dei contenuti."
            ],
            "requirements": [
                "3+ anni in content marketing B2B.",
                "SEO copywriting e content strategy.",
                "Gestione editoriale multi-canale."
            ]
        }
    },
    "cand-15": {
        "id": "cand-15",
        "name": "Davide Russo",
        "email": "davide.r@datascience.io",
        "phone": "+39 328 777 8888",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Machine Learning Engineer",
        "department": "Engineering",
        "score": 96,
        "experienceYears": 8,
        "appliedDate": "2026-05-14",
        "status": "Interviewing",
        "summary": "ML Engineer con PhD in Computer Science. Pubblicazioni su NeurIPS e ICML. Esperienza in produzione di modelli NLP e computer vision.",
        "matchReason": "Profilo accademico e industriale eccezionale. Ideale per guidare le iniziative AI dell'azienda.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 5,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-15-1",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-16",
                "content": "Colloquio tecnico brillante. Conoscenza profonda di transformer architectures."
            },
            {
                "id": "note-15-2",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "date": "2026-05-20",
                "content": "Secondo colloquio eccellente. Prepariamo offerta competitiva."
            }
        ],
        "timeline": [
            {
                "id": "tl-15-1",
                "date": "2026-05-14",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-15-2",
                "date": "2026-05-15",
                "type": "status_change",
                "title": "In Screening",
                "description": "Passato in screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            },
            {
                "id": "tl-15-3",
                "date": "2026-05-16",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Colloquio tecnico programmato.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            }
        ],
        "jobPosition": {
            "description": "Sviluppo e deployment di modelli ML/NLP per le iniziative AI aziendali.",
            "responsibilities": [
                "Sviluppare modelli NLP e computer vision.",
                "Implementare pipeline MLOps.",
                "Integrare AI nelle feature di prodotto."
            ],
            "requirements": [
                "6+ anni in ML engineering.",
                "PhD o pubblicazioni top-tier.",
                "PyTorch e deployment modelli in produzione."
            ]
        }
    },
    "cand-16": {
        "id": "cand-16",
        "name": "Francesca Conti",
        "email": "f.conti@hrpartners.it",
        "phone": "+39 335 999 0000",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "HR Business Partner",
        "department": "Product",
        "score": 81,
        "experienceYears": 7,
        "appliedDate": "2026-05-23",
        "status": "Screening",
        "summary": "HR Business Partner con esperienza in aziende tech scale-up. Specializzata in employer branding, talent acquisition e people analytics.",
        "matchReason": "Esperienza rilevante in contesti tech ad alta crescita. Buon fit culturale.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-16-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-24",
                "content": "Primo screening positivo. Conosce bene le dinamiche di team engineering."
            }
        ],
        "timeline": [
            {
                "id": "tl-16-1",
                "date": "2026-05-23",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-16-2",
                "date": "2026-05-24",
                "type": "status_change",
                "title": "In Screening",
                "description": "Stato modificato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "Supporto strategico ai team tech in crescita con talent acquisition e people analytics.",
            "responsibilities": [
                "Strategie di talent acquisition per ruoli tech.",
                "Employer branding e employee engagement.",
                "People analytics e OKR HR."
            ],
            "requirements": [
                "5+ anni come HRBP in aziende tech.",
                "Contesti scale-up ad alta crescita.",
                "People analytics e strumenti HR digitali."
            ]
        }
    },
    "cand-17": {
        "id": "cand-17",
        "name": "Nicola Santoro",
        "email": "nicola.s@frontend.dev",
        "phone": "+39 349 123 4567",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Frontend Developer",
        "department": "Engineering",
        "score": 79,
        "experienceYears": 4,
        "appliedDate": "2026-05-20",
        "status": "Rejected",
        "summary": "Frontend developer con esperienza in Vue.js e Angular. Buona conoscenza di CSS avanzato e animazioni web.",
        "matchReason": "Competenze frontend solide ma manca esperienza React, nostro stack principale.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-17-1",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-22",
                "content": "Buon profilo ma non ha esperienza React. Suggerito di ripresentarsi dopo formazione."
            }
        ],
        "timeline": [
            {
                "id": "tl-17-1",
                "date": "2026-05-20",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-17-2",
                "date": "2026-05-22",
                "type": "status_change",
                "title": "Scartato",
                "description": "Manca esperienza React.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Rejected"
                }
            }
        ],
        "jobPosition": {
            "description": "Sviluppo di interfacce web moderne con focus su componenti riutilizzabili e animazioni.",
            "responsibilities": [
                "Sviluppare componenti con framework JS moderni.",
                "CSS avanzato e animazioni web.",
                "Cross-browser compatibility e responsive design."
            ],
            "requirements": [
                "3+ anni in sviluppo frontend.",
                "React (nostro stack principale).",
                "CSS avanzato e web animations."
            ]
        }
    },
    "cand-18": {
        "id": "cand-18",
        "name": "Elisa Marchetti",
        "email": "elisa.m@qaexperts.com",
        "phone": "+39 340 234 5678",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "QA Engineer",
        "department": "Engineering",
        "score": 83,
        "experienceYears": 5,
        "appliedDate": "2026-05-18",
        "status": "Interviewing",
        "summary": "QA Engineer con esperienza in test automation, Cypress, Playwright e testing di API REST. Forte orientamento alla quality culture.",
        "matchReason": "Ottima esperienza con Cypress e Playwright. Perfetta per il nostro processo di CI/CD.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-18-1",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-20",
                "content": "Colloquio tecnico andato bene. Sa impostare strategie di test end-to-end."
            }
        ],
        "timeline": [
            {
                "id": "tl-18-1",
                "date": "2026-05-18",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-18-2",
                "date": "2026-05-19",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            },
            {
                "id": "tl-18-3",
                "date": "2026-05-20",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Colloquio tecnico.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            }
        ],
        "jobPosition": {
            "description": "Garanzia della qualità attraverso automazione test e integrazione CI/CD.",
            "responsibilities": [
                "Strategie di test automation.",
                "Test E2E con Cypress e Playwright.",
                "Integrazione test nella pipeline CI/CD."
            ],
            "requirements": [
                "4+ anni in QA e test automation.",
                "Cypress, Playwright e API testing.",
                "Strategie test E2E e BDD."
            ]
        }
    },
    "cand-19": {
        "id": "cand-19",
        "name": "Roberto Vitale",
        "email": "r.vitale@salesmaster.it",
        "phone": "+39 331 345 6789",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Sales Development Representative",
        "department": "Sales",
        "score": 71,
        "experienceYears": 2,
        "appliedDate": "2026-05-27",
        "status": "Applied",
        "summary": "SDR motivato con esperienza in outbound prospecting B2B. Conosce bene Salesforce e strumenti di sales engagement.",
        "matchReason": "Giovane ma determinato. Buoni numeri nel ruolo precedente. Da valutare in screening.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 2,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [],
        "timeline": [
            {
                "id": "tl-19-1",
                "date": "2026-05-27",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea.",
                "author": "System",
                "authorRole": "viewer"
            }
        ],
        "jobPosition": {
            "description": "Generazione di opportunità di vendita qualificate attraverso outbound prospecting B2B.",
            "responsibilities": [
                "Outbound prospecting via email e LinkedIn.",
                "Qualificare lead e schedulare demo.",
                "Gestire e aggiornare il CRM."
            ],
            "requirements": [
                "1+ anno in ruoli SDR/BDR.",
                "Conoscenza Salesforce e sales engagement.",
                "Capacità comunicative e resilienza."
            ]
        }
    },
    "cand-20": {
        "id": "cand-20",
        "name": "Martina Pellegrini",
        "email": "martina.p@designhub.co",
        "phone": "+39 347 456 7890",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Motion Designer",
        "department": "Design",
        "score": 80,
        "experienceYears": 4,
        "appliedDate": "2026-05-24",
        "status": "Screening",
        "summary": "Motion designer creativa con esperienza in After Effects, Lottie e micro-interazioni per prodotti digitali.",
        "matchReason": "Portfolio visivamente impressionante. Le sue animazioni Lottie sono molto fluide.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-20-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-25",
                "content": "Portfolio molto interessante. Programmiamo review con il design lead."
            }
        ],
        "timeline": [
            {
                "id": "tl-20-1",
                "date": "2026-05-24",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-20-2",
                "date": "2026-05-25",
                "type": "status_change",
                "title": "In Screening",
                "description": "Passata in screening.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "Creazione di animazioni e micro-interazioni per prodotti digitali.",
            "responsibilities": [
                "Animazioni UI e micro-interazioni.",
                "Asset Lottie ottimizzati.",
                "Collaborare con frontend per implementazione."
            ],
            "requirements": [
                "3+ anni in motion design digitale.",
                "After Effects e Lottie.",
                "Framer Motion o librerie animazione web."
            ]
        }
    },
    "cand-21": {
        "id": "cand-21",
        "name": "Giovanni Fabbri",
        "email": "g.fabbri@cloudops.io",
        "phone": "+39 320 567 8901",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Site Reliability Engineer",
        "department": "Engineering",
        "score": 90,
        "experienceYears": 7,
        "appliedDate": "2026-05-16",
        "status": "Offered",
        "summary": "SRE con esperienza in sistemi ad alta disponibilita. Expert in observability, incident management e chaos engineering.",
        "matchReason": "Profilo SRE raro e molto richiesto. Esperienza diretta con sistemi 99.99% uptime.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-21-1",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "date": "2026-05-22",
                "content": "Candidato eccellente. Offerta inviata."
            }
        ],
        "timeline": [
            {
                "id": "tl-21-1",
                "date": "2026-05-16",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-21-2",
                "date": "2026-05-18",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Colloquio diretto con VP.",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Interviewing"
                }
            },
            {
                "id": "tl-21-3",
                "date": "2026-05-22",
                "type": "status_change",
                "title": "Offerta",
                "description": "Proposta inviata.",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Interviewing",
                    "newStatus": "Offered"
                }
            }
        ],
        "jobPosition": {
            "description": "Affidabilità e disponibilità dei sistemi in produzione con observability e chaos engineering.",
            "responsibilities": [
                "Mantenere uptime 99.99%.",
                "Monitoring con Prometheus e Grafana.",
                "Chaos engineering experiments."
            ],
            "requirements": [
                "6+ anni in SRE/DevOps.",
                "Sistemi ad alta disponibilità.",
                "Observability stack (Prometheus, Grafana)."
            ]
        }
    },
    "cand-22": {
        "id": "cand-22",
        "name": "Alessia Romano",
        "email": "alessia.r@productlab.it",
        "phone": "+39 338 678 9012",
        "avatar": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Product Owner",
        "department": "Product",
        "score": 86,
        "experienceYears": 6,
        "appliedDate": "2026-05-21",
        "status": "Interviewing",
        "summary": "Product Owner certificata CSPO con forte esperienza in metodologie agili. Ha gestito prodotti SaaS B2B con oltre 50k utenti attivi.",
        "matchReason": "Ottima combinazione di competenze tecniche e business. Forte nel definire user stories.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-22-1",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "date": "2026-05-24",
                "content": "Colloquio molto positivo. Sa bilanciare bene esigenze tecniche e di business."
            }
        ],
        "timeline": [
            {
                "id": "tl-22-1",
                "date": "2026-05-21",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-22-2",
                "date": "2026-05-22",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            },
            {
                "id": "tl-22-3",
                "date": "2026-05-24",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Colloquio con CPO.",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            }
        ],
        "jobPosition": {
            "description": "Gestione del backlog e prioritizzazione per il team di sviluppo.",
            "responsibilities": [
                "Definire e prioritizzare user stories.",
                "Facilitare sprint planning e review.",
                "Allineare stakeholder su roadmap."
            ],
            "requirements": [
                "5+ anni come PO certificato.",
                "Prodotti SaaS B2B e Agile/Scrum.",
                "Bilanciare esigenze tecniche e business."
            ]
        }
    },
    "cand-23": {
        "id": "cand-23",
        "name": "Simone Barbieri",
        "email": "simone.b@fullstack.dev",
        "phone": "+39 345 789 0123",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Full Stack Developer",
        "department": "Engineering",
        "score": 77,
        "experienceYears": 3,
        "appliedDate": "2026-05-26",
        "status": "Applied",
        "summary": "Sviluppatore full stack con esperienza in React, Node.js e PostgreSQL. Appassionato di clean code e testing.",
        "matchReason": "Profilo junior-mid promettente. Da valutare la profondita delle competenze architetturali.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [],
        "timeline": [
            {
                "id": "tl-23-1",
                "date": "2026-05-26",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea.",
                "author": "System",
                "authorRole": "viewer"
            }
        ],
        "jobPosition": {
            "description": "Sviluppo feature end-to-end sulla piattaforma SaaS con React e Node.js.",
            "responsibilities": [
                "Feature full stack React + Node.js.",
                "Database PostgreSQL e query.",
                "Test unitari e di integrazione."
            ],
            "requirements": [
                "2+ anni full stack.",
                "PostgreSQL e TypeScript.",
                "Clean code e testing."
            ]
        }
    },
    "cand-24": {
        "id": "cand-24",
        "name": "Ilaria Morandi",
        "email": "ilaria.m@brandstrategy.it",
        "phone": "+39 331 890 1234",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Brand Manager",
        "department": "Marketing",
        "score": 82,
        "experienceYears": 6,
        "appliedDate": "2026-05-19",
        "status": "Rejected",
        "summary": "Brand manager con esperienza in rebranding aziendale e comunicazione corporate. Forte background in PR e media relations.",
        "matchReason": "Profilo interessante ma il ruolo richiede competenze digitali piu avanzate.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-24-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-21",
                "content": "Buon profilo ma non allineata con le nostre esigenze di digital marketing."
            }
        ],
        "timeline": [
            {
                "id": "tl-24-1",
                "date": "2026-05-19",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-24-2",
                "date": "2026-05-21",
                "type": "status_change",
                "title": "Scartata",
                "description": "Profilo non allineato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Rejected"
                }
            }
        ],
        "jobPosition": {
            "description": "Gestione identità di brand e comunicazione corporate nel mercato tech.",
            "responsibilities": [
                "Linee guida del brand.",
                "Campagne PR e media relations.",
                "Comunicazione corporate multi-canale."
            ],
            "requirements": [
                "5+ anni in brand management.",
                "Digital marketing e PR.",
                "Rebranding e comunicazione corporate."
            ]
        }
    },
    "cand-25": {
        "id": "cand-25",
        "name": "Liam O'Brien",
        "email": "liam.obrien@techglobal.com",
        "phone": "+44 7911 123456",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Technical Lead",
        "department": "Engineering",
        "score": 94,
        "experienceYears": 11,
        "appliedDate": "2026-05-13",
        "status": "Hired",
        "summary": "Technical Lead con esperienza nella guida di team distribuiti. Expert in architetture serverless e event-driven su AWS.",
        "matchReason": "Leadership tecnica eccezionale. Ha gestito team di 15+ developer in contesti enterprise.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 5,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-25-1",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "date": "2026-05-18",
                "content": "Uno dei migliori Tech Lead che abbiamo mai intervistato. Contratto firmato!"
            }
        ],
        "timeline": [
            {
                "id": "tl-25-1",
                "date": "2026-05-13",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Referral da headhunter.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-25-2",
                "date": "2026-05-15",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Colloqui accelerati.",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Interviewing"
                }
            },
            {
                "id": "tl-25-3",
                "date": "2026-05-18",
                "type": "status_change",
                "title": "Assunto",
                "description": "Contratto firmato.",
                "author": "Fabio T. (VP of Eng)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Offered",
                    "newStatus": "Hired"
                }
            }
        ],
        "jobPosition": {
            "description": "Guida tecnica di team 15+ developer in architetture serverless su AWS.",
            "responsibilities": [
                "Scelte architetturali del team.",
                "Mentoring e crescita tecnica.",
                "Standard codice e code review."
            ],
            "requirements": [
                "8+ anni, di cui 3+ in leadership tecnica.",
                "Architetture serverless e event-driven AWS.",
                "Gestione team distribuiti."
            ]
        }
    },
    "cand-26": {
        "id": "cand-26",
        "name": "Beatrice Mancini",
        "email": "bea.m@analytics.pro",
        "phone": "+39 340 901 2345",
        "avatar": "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Business Analyst",
        "department": "Product",
        "score": 75,
        "experienceYears": 3,
        "appliedDate": "2026-05-28",
        "status": "Applied",
        "summary": "Business analyst con competenze in analisi dei requisiti, process mapping e documentazione tecnica.",
        "matchReason": "Profilo promettente. Da valutare esperienza con stakeholder tecnici.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [],
        "timeline": [
            {
                "id": "tl-26-1",
                "date": "2026-05-28",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea.",
                "author": "System",
                "authorRole": "viewer"
            }
        ],
        "jobPosition": {
            "description": "Analisi requisiti di business e traduzione in specifiche tecniche.",
            "responsibilities": [
                "Raccogliere requisiti di business.",
                "Process mapping e diagrammi BPMN.",
                "Workshop con stakeholder."
            ],
            "requirements": [
                "2+ anni come Business Analyst.",
                "Analisi requisiti e process mapping.",
                "Confluence e BPMN."
            ]
        }
    },
    "cand-27": {
        "id": "cand-27",
        "name": "Matteo Rizzo",
        "email": "matteo.rizzo@platform.eng",
        "phone": "+39 347 012 3456",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Platform Engineer",
        "department": "Engineering",
        "score": 88,
        "experienceYears": 6,
        "appliedDate": "2026-05-20",
        "status": "Interviewing",
        "summary": "Platform engineer con esperienza in Internal Developer Platforms. Competenze in Backstage, ArgoCD e self-service infra.",
        "matchReason": "Profilo raro e molto ricercato. Conosce bene le esigenze dei team di sviluppo interni.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-27-1",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-23",
                "content": "Colloquio molto interessante. Ha costruito un IDP da zero nel ruolo precedente."
            }
        ],
        "timeline": [
            {
                "id": "tl-27-1",
                "date": "2026-05-20",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-27-2",
                "date": "2026-05-21",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            },
            {
                "id": "tl-27-3",
                "date": "2026-05-23",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Colloquio tecnico.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            }
        ],
        "jobPosition": {
            "description": "Costruzione dell'Internal Developer Platform con self-service infra e golden paths.",
            "responsibilities": [
                "IDP con Backstage.",
                "Golden paths e self-service infrastructure.",
                "Developer experience e onboarding."
            ],
            "requirements": [
                "5+ anni in platform engineering.",
                "Backstage, ArgoCD e Kubernetes.",
                "Developer experience e internal tooling."
            ]
        }
    },
    "cand-28": {
        "id": "cand-28",
        "name": "Serena Caruso",
        "email": "serena.c@uxresearch.it",
        "phone": "+39 333 123 4567",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "UX Researcher",
        "department": "Design",
        "score": 87,
        "experienceYears": 5,
        "appliedDate": "2026-05-22",
        "status": "Screening",
        "summary": "UX Researcher qualitativa e quantitativa. Esperta in user interviews, usability testing e analisi comportamentale.",
        "matchReason": "Forte approccio metodologico alla ricerca. Portfolio di case study molto dettagliato.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-28-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-23",
                "content": "Screening iniziale molto positivo. Ha esperienza con team product-led."
            }
        ],
        "timeline": [
            {
                "id": "tl-28-1",
                "date": "2026-05-22",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-28-2",
                "date": "2026-05-23",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "Ricerche qualitative e quantitative per informare le decisioni di design e prodotto.",
            "responsibilities": [
                "User interviews e usability testing.",
                "Analisi dati comportamentali.",
                "Sintetizzare insight e raccomandazioni."
            ],
            "requirements": [
                "4+ anni in UX research.",
                "Metodi qualitativi e quantitativi.",
                "Hotjar, Maze, UserTesting."
            ]
        }
    },
    "cand-29": {
        "id": "cand-29",
        "name": "Paolo Greco",
        "email": "paolo.g@enterprise.sales",
        "phone": "+39 328 234 5678",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Customer Success Manager",
        "department": "Sales",
        "score": 74,
        "experienceYears": 4,
        "appliedDate": "2026-05-25",
        "status": "Applied",
        "summary": "CSM con esperienza in onboarding clienti enterprise e gestione portafoglio. Buone capacita di upselling.",
        "matchReason": "Esperienza CS solida. Da verificare competenze su tool di customer success automation.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [],
        "timeline": [
            {
                "id": "tl-29-1",
                "date": "2026-05-25",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea.",
                "author": "System",
                "authorRole": "viewer"
            }
        ],
        "jobPosition": {
            "description": "Gestione portafoglio clienti enterprise con focus su onboarding e prevenzione churn.",
            "responsibilities": [
                "Onboarding e training enterprise.",
                "Health score e rischi churn.",
                "Upselling e cross-selling."
            ],
            "requirements": [
                "3+ anni in customer success B2B SaaS.",
                "Gestione portafoglio e customer lifecycle.",
                "Gainsight o ChurnZero."
            ]
        }
    },
    "cand-30": {
        "id": "cand-30",
        "name": "Aurora Lombardi",
        "email": "aurora.l@techwriter.io",
        "phone": "+39 340 345 6789",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Technical Writer",
        "department": "Product",
        "score": 78,
        "experienceYears": 3,
        "appliedDate": "2026-05-27",
        "status": "Screening",
        "summary": "Technical writer con esperienza in documentazione API, guide utente e knowledge base. Competenze in Markdown e docs-as-code.",
        "matchReason": "Scrive documentazione chiara e strutturata. Esperienza con OpenAPI/Swagger.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-30-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-28",
                "content": "Primo contatto positivo. Esempi di documentazione molto chiari."
            }
        ],
        "timeline": [
            {
                "id": "tl-30-1",
                "date": "2026-05-27",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-30-2",
                "date": "2026-05-28",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "Documentazione tecnica per API, guide utente e knowledge base con approccio docs-as-code.",
            "responsibilities": [
                "Documentazione API con OpenAPI/Swagger.",
                "Guide utente e knowledge base.",
                "Workflow docs-as-code con Git."
            ],
            "requirements": [
                "2+ anni in technical writing.",
                "Documentazione API e Markdown.",
                "Docs-as-code e Git."
            ]
        }
    },
    "cand-31": {
        "id": "cand-31",
        "name": "Filippo Costa",
        "email": "filippo.c@database.expert",
        "phone": "+39 335 456 7890",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Database Administrator",
        "department": "Engineering",
        "score": 82,
        "experienceYears": 8,
        "appliedDate": "2026-05-21",
        "status": "Interviewing",
        "summary": "DBA senior con esperienza in PostgreSQL, MongoDB e Redis. Specializzato in ottimizzazione query e database sharding.",
        "matchReason": "Competenze DBA molto solide. Ha gestito database con miliardi di record.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-31-1",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-24",
                "content": "Colloquio tecnico eccellente su ottimizzazione e scaling."
            }
        ],
        "timeline": [
            {
                "id": "tl-31-1",
                "date": "2026-05-21",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-31-2",
                "date": "2026-05-22",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            },
            {
                "id": "tl-31-3",
                "date": "2026-05-24",
                "type": "status_change",
                "title": "In Colloquio",
                "description": "Colloquio tecnico.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Screening",
                    "newStatus": "Interviewing"
                }
            }
        ],
        "jobPosition": {
            "description": "Gestione e scaling dei database aziendali per dataset con miliardi di record.",
            "responsibilities": [
                "Ottimizzare query e indici.",
                "Sharding e replicazione.",
                "Backup e disaster recovery."
            ],
            "requirements": [
                "6+ anni come DBA.",
                "PostgreSQL, MongoDB e Redis.",
                "Database sharding per grandi volumi."
            ]
        }
    },
    "cand-32": {
        "id": "cand-32",
        "name": "Giulia Parisi",
        "email": "giulia.p@socialads.it",
        "phone": "+39 349 567 8901",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Performance Marketing Manager",
        "department": "Marketing",
        "score": 85,
        "experienceYears": 5,
        "appliedDate": "2026-05-18",
        "status": "Offered",
        "summary": "Performance marketer con track record in Google Ads, Meta Ads e programmatic advertising. ROI medio 4.5x sulle campagne gestite.",
        "matchReason": "Numeri eccellenti sulle campagne precedenti. Ottimo approccio data-driven.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-32-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-22",
                "content": "Colloquio andato benissimo. Offerta in preparazione."
            }
        ],
        "timeline": [
            {
                "id": "tl-32-1",
                "date": "2026-05-18",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-32-2",
                "date": "2026-05-19",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            },
            {
                "id": "tl-32-3",
                "date": "2026-05-22",
                "type": "status_change",
                "title": "Offerta",
                "description": "Proposta economica inviata.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Interviewing",
                    "newStatus": "Offered"
                }
            }
        ],
        "jobPosition": {
            "description": "Campagne performance marketing su Google e Meta con approccio data-driven.",
            "responsibilities": [
                "Budget advertising Google e Meta.",
                "Ottimizzare ROI con A/B testing.",
                "Reportare performance al management."
            ],
            "requirements": [
                "4+ anni in performance marketing.",
                "ROI 3x+ sulle campagne.",
                "Google Ads, Meta Ads e programmatic."
            ]
        }
    },
    "cand-33": {
        "id": "cand-33",
        "name": "Emanuele Ferro",
        "email": "emanuele.f@agile.coach",
        "phone": "+39 320 678 9012",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Scrum Master",
        "department": "Product",
        "score": 73,
        "experienceYears": 4,
        "appliedDate": "2026-05-26",
        "status": "Rejected",
        "summary": "Scrum Master certificato PSM II con esperienza in team di sviluppo software. Buone capacita di facilitazione.",
        "matchReason": "Buon profilo ma cerchiamo qualcuno con esperienza in contesti di scaling (SAFe/LeSS).",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 3,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-33-1",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "date": "2026-05-28",
                "content": "Buon candidato ma manca esperienza di scaling agile. Rifiutiamo con feedback costruttivo."
            }
        ],
        "timeline": [
            {
                "id": "tl-33-1",
                "date": "2026-05-26",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-33-2",
                "date": "2026-05-28",
                "type": "status_change",
                "title": "Scartato",
                "description": "Manca esperienza scaling.",
                "author": "Marco D. (CPO)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Rejected"
                }
            }
        ],
        "jobPosition": {
            "description": "Facilitazione processi Agile per team di sviluppo software.",
            "responsibilities": [
                "Facilitare cerimonie Scrum.",
                "Rimuovere impedimenti.",
                "Continuous improvement e retrospective."
            ],
            "requirements": [
                "3+ anni come Scrum Master certificato.",
                "Scaling Agile (SAFe o LeSS).",
                "Facilitazione e coaching team."
            ]
        }
    },
    "cand-34": {
        "id": "cand-34",
        "name": "Camilla Bianchi",
        "email": "camilla.b@illustration.art",
        "phone": "+39 331 789 0123",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Visual Designer",
        "department": "Design",
        "score": 81,
        "experienceYears": 3,
        "appliedDate": "2026-05-25",
        "status": "Applied",
        "summary": "Visual designer con forte sensibilita estetica. Competenze in illustrazione digitale, branding e design di interfacce.",
        "matchReason": "Stile visivo molto allineato alla nostra brand identity. Da valutare competenze UX.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [],
        "timeline": [
            {
                "id": "tl-34-1",
                "date": "2026-05-25",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura spontanea con portfolio.",
                "author": "System",
                "authorRole": "viewer"
            }
        ],
        "jobPosition": {
            "description": "Asset visivi e interfacce grafiche allineate all'identità di brand.",
            "responsibilities": [
                "Interfacce coerenti col brand.",
                "Illustrazioni digitali e asset grafici.",
                "Collaborazione col team UX."
            ],
            "requirements": [
                "2+ anni in visual design.",
                "Portfolio con sensibilità estetica.",
                "Figma e Adobe Suite."
            ]
        }
    },
    "cand-35": {
        "id": "cand-35",
        "name": "Lorenzo Marini",
        "email": "lorenzo.m@embedded.sys",
        "phone": "+39 345 890 1234",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Embedded Systems Engineer",
        "department": "Engineering",
        "score": 69,
        "experienceYears": 5,
        "appliedDate": "2026-05-23",
        "status": "Rejected",
        "summary": "Ingegnere embedded con esperienza in C/C++ e sistemi RTOS. Competenze in firmware development e protocolli IoT.",
        "matchReason": "Competenze tecniche ottime ma il ruolo non esiste nel nostro stack attuale (solo web/cloud).",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 4,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 2,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-35-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-24",
                "content": "Profilo fuori scope per le nostre posizioni attuali. Rifiuto con suggerimento di ricandidarsi se apriamo ruoli IoT."
            }
        ],
        "timeline": [
            {
                "id": "tl-35-1",
                "date": "2026-05-23",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-35-2",
                "date": "2026-05-24",
                "type": "status_change",
                "title": "Scartato",
                "description": "Ruolo non disponibile.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Rejected"
                }
            }
        ],
        "jobPosition": {
            "description": "Sviluppo firmware per dispositivi IoT con sistemi real-time.",
            "responsibilities": [
                "Firmware C/C++ per RTOS.",
                "Protocolli IoT low-power.",
                "Hardware/software integration testing."
            ],
            "requirements": [
                "4+ anni in embedded systems.",
                "C/C++ e sistemi RTOS.",
                "Protocolli IoT (MQTT, CoAP, BLE)."
            ]
        }
    },
    "cand-36": {
        "id": "cand-36",
        "name": "Veronica Tosi",
        "email": "veronica.t@partnerships.biz",
        "phone": "+39 347 901 2345",
        "avatar": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "Partnership Manager",
        "department": "Sales",
        "score": 80,
        "experienceYears": 6,
        "appliedDate": "2026-05-20",
        "status": "Screening",
        "summary": "Partnership manager con rete di contatti estesa nel settore SaaS europeo. Ha chiuso deal di co-marketing da oltre 500k euro.",
        "matchReason": "Rete di contatti molto interessante per il nostro programma partner.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-36-1",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "date": "2026-05-22",
                "content": "Rete di contatti verificata. Molto interessante per la nostra espansione."
            }
        ],
        "timeline": [
            {
                "id": "tl-36-1",
                "date": "2026-05-20",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-36-2",
                "date": "2026-05-22",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening avviato.",
                "author": "Sandro P. (HR)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "Partnership strategiche nel settore SaaS europeo con co-marketing e channel sales.",
            "responsibilities": [
                "Negoziare partnership B2B.",
                "Programmi co-marketing e referral.",
                "Channel sales e partner enablement."
            ],
            "requirements": [
                "5+ anni in partnership management.",
                "Rete contatti SaaS europeo.",
                "Co-marketing e channel sales."
            ]
        }
    },
    "cand-37": {
        "id": "cand-37",
        "name": "Riccardo Pagano",
        "email": "riccardo.p@api.design",
        "phone": "+39 338 012 3456",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
        "role": "API Engineer",
        "department": "Engineering",
        "score": 86,
        "experienceYears": 5,
        "appliedDate": "2026-05-24",
        "status": "Screening",
        "summary": "API Engineer specializzato in design RESTful e GraphQL. Esperienza in API gateway, rate limiting e versioning strategies.",
        "matchReason": "Competenze API design molto solide. Perfetto per il nostro progetto di API pubblica.",
        "softSkills": [
            {
                "name": "Tech Capability",
                "score": 5,
                "maxScore": 5
            },
            {
                "name": "Comunicazione",
                "score": 3,
                "maxScore": 5
            },
            {
                "name": "Fit Culturale",
                "score": 4,
                "maxScore": 5
            }
        ],
        "notes": [
            {
                "id": "note-37-1",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "date": "2026-05-26",
                "content": "Screening tecnico positivo. Conosce bene i pattern di API design."
            }
        ],
        "timeline": [
            {
                "id": "tl-37-1",
                "date": "2026-05-24",
                "type": "created",
                "title": "Candidatura Ricevuta",
                "description": "Candidatura registrata.",
                "author": "System",
                "authorRole": "viewer"
            },
            {
                "id": "tl-37-2",
                "date": "2026-05-26",
                "type": "status_change",
                "title": "In Screening",
                "description": "Screening tecnico.",
                "author": "Chiara L. (Lead Tech)",
                "authorRole": "admin",
                "meta": {
                    "oldStatus": "Applied",
                    "newStatus": "Screening"
                }
            }
        ],
        "jobPosition": {
            "description": "API pubbliche robuste e ben documentate con focus su developer experience e scalabilità.",
            "responsibilities": [
                "API RESTful e GraphQL.",
                "Rate limiting, versioning e API gateway.",
                "Documentazione OpenAPI e SDK."
            ],
            "requirements": [
                "4+ anni in API design.",
                "REST, GraphQL e OpenAPI.",
                "API gateway e versioning strategies."
            ]
        }
    }
};
