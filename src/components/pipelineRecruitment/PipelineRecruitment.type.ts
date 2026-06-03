import type {CandidateStatus} from '../../features/applicant/applicant.type';

export interface PipelineRecruitmentProps {
    currentStatus: CandidateStatus;
    isAdmin: boolean;
    onStatusChange: (status: CandidateStatus) => void;
}

export interface PipelineStep {
    status: CandidateStatus;
    labelKey: string;
    labelFallback: string;
}
