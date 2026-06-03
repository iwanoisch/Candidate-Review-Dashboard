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

export interface SoftSkill {
    name: string;
    score: number;
    maxScore: number;
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
    tags: string[];
}

export interface CandidateDetail extends Candidate {
    summary: string;
    matchReason: string;
    softSkills: SoftSkill[];
    notes: CandidateNote[] | null;
    timeline: TimelineEvent[] | null;
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
    selectedCandidate: CandidateDetail | null;
    pagination: IPagination | null;
    stats: ApplicantStats | null;
}
