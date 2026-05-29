import type {CandidateFilters} from '../common/filterBar/FilterBar.type';

export const DEFAULT_FILTERS: CandidateFilters = {
    search: '',
    department: 'all',
    status: 'all',
    sortBy: 'score_desc',
};

export interface FilterOption {
    value: string;
    labelKey: string;
    labelFallback: string;
}

export const STATUS_OPTIONS: FilterOption[] = [
    {value: 'all', labelKey: 'candidates.filter_all_statuses', labelFallback: 'Qualsiasi stato'},
    {value: 'Applied', labelKey: 'candidates.status_applied', labelFallback: 'Applied (Candidati)'},
    {value: 'Screening', labelKey: 'candidates.status_screening', labelFallback: 'Screening (Qualifica)'},
    {value: 'Interviewing', labelKey: 'candidates.status_interviewing', labelFallback: 'Interviewing (In Colloquio)'},
    {value: 'Offered', labelKey: 'candidates.status_offered', labelFallback: 'Offered (Proposta Economica)'},
    {value: 'Hired', labelKey: 'candidates.status_hired', labelFallback: 'Hired (Assunti)'},
    {value: 'Rejected', labelKey: 'candidates.status_rejected', labelFallback: 'Rejected (Scartati)'},
];

export const SORT_OPTIONS: FilterOption[] = [
    {value: 'score_desc', labelKey: 'candidates.sort_score', labelFallback: 'Score (In vetta)'},
    {value: 'applied_desc', labelKey: 'candidates.sort_date', labelFallback: 'Data candidato (Recenti)'},
    {value: 'experience_desc', labelKey: 'candidates.sort_experience', labelFallback: 'Esperienza lavorativa'},
    {value: 'alpha_asc', labelKey: 'candidates.sort_alpha', labelFallback: 'Alfabetico (A-Z)'},
];
