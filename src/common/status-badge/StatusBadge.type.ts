import type {CandidateStatus} from '../../features/applicant/applicant.type';

export interface StatusBadgeProps {
    status: CandidateStatus;
    size?: 'sm' | 'md';
}
