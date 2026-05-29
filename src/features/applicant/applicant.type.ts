import type {UserRole} from '../auth/auth.type';

export type CandidateStatus =
    | 'Applied'
    | 'Screening'
    | 'Interviewing'
    | 'Offered'
    | 'Hired'
    | 'Rejected';

export interface CandidateNote {
    id: string;
    author: string;
    authorRole: UserRole;
    date: string;
    content: string;
}

export interface TimelineEvent {
    id: string;
    date: string;
    type: 'status_change' | 'note_added' | 'created';
    title: string;
    description: string;
    author: string;
    authorRole: UserRole;
    meta?: {
        oldStatus?: CandidateStatus;
        newStatus?: CandidateStatus;
    };
}

export interface Candidate {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
    department: string;
    score: number;
    experienceYears: number;
    appliedDate: string;
    status: CandidateStatus;
    summary: string;
    matchReason: string;
    tags: string[];
    notes: CandidateNote[];
    timeline: TimelineEvent[];
}

import type {IPagination} from '../../hooks/api/useApiClient.type';

export interface ApplicantStats {
    totalCandidates: number;
    underReview: number;
    hired: number;
    avgScore: number;
}

export interface ApplicantState {
    candidates: Candidate[];
    selectedCandidate: Candidate | null;
    pagination: IPagination | null;
    stats: ApplicantStats | null;
}
