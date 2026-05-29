import type {CandidateStatus} from '../features/applicant/applicant.type';

interface StatusConfig {
    label: string;
    bg: string;
    text: string;
    border: string;
}

export const statusConfig: Record<CandidateStatus, StatusConfig> = {
    Applied: {
        label: 'Candidato',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
    },
    Screening: {
        label: 'Screening',
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
    },
    Interviewing: {
        label: 'Colloquio',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
    },
    Offered: {
        label: 'Offerta',
        bg: 'bg-pink-50',
        text: 'text-pink-700',
        border: 'border-pink-200',
    },
    Hired: {
        label: 'Assunto',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
    },
    Rejected: {
        label: 'Scartato',
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
    },
};
