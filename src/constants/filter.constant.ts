import type {IFilterList} from '../common/filterList/FilterList.type.ts';
import { PipelineStep } from '../components/pipelineRecruitment/PipelineRecruitment.type.ts';

export const DEFAULT_FILTERS: IFilterList = {
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
    {value: 'Applied', labelKey: 'candidates.status_applied', labelFallback: 'Candidati'},
    {value: 'Screening', labelKey: 'candidates.status_screening', labelFallback: 'Qualifica'},
    {value: 'Interviewing', labelKey: 'candidates.status_interviewing', labelFallback: 'In Colloquio'},
    {value: 'Offered', labelKey: 'candidates.status_offered', labelFallback: 'Proposta Economica'},
    {value: 'Hired', labelKey: 'candidates.status_hired', labelFallback: 'Assunti'},
    {value: 'Rejected', labelKey: 'candidates.status_rejected', labelFallback: 'Scartati'},
];

export const SORT_OPTIONS: FilterOption[] = [
    {value: 'score_desc', labelKey: 'candidates.sort_score', labelFallback: 'Score'},
    {value: 'applied_desc', labelKey: 'candidates.sort_date', labelFallback: 'Data candidato'},
    {value: 'experience_desc', labelKey: 'candidates.sort_experience', labelFallback: 'Esperienza lavorativa'},
    {value: 'alpha_asc', labelKey: 'candidates.sort_alpha', labelFallback: 'Alfabetico (A-Z)'},
];

export const PIPELINE_STEPS: PipelineStep[] = [
    {status: 'Applied', labelKey: 'candidates.status_applied', labelFallback: 'Candidato'},
    {status: 'Screening', labelKey: 'candidates.status_screening', labelFallback: 'Screening'},
    {status: 'Interviewing', labelKey: 'candidates.status_interviewing', labelFallback: 'Colloquio'},
    {status: 'Offered', labelKey: 'candidates.status_offered', labelFallback: 'Offerta'},
    {status: 'Hired', labelKey: 'candidates.status_hired', labelFallback: 'Assunto'},
    {status: 'Rejected', labelKey: 'candidates.status_rejected', labelFallback: 'Scartato'},
];
