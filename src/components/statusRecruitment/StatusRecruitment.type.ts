import type {CandidateStatus} from '../../features/applicant/applicant.type';

export interface StatusRecruitmentProps {
    currentStatus: CandidateStatus;
    isAdmin: boolean;
    onStatusChange: (status: CandidateStatus) => void;
}

export interface StatusStep {
    status: CandidateStatus;
    labelKey: string;
    labelFallback: string;
}
