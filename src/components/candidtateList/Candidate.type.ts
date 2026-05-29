import {Candidate} from "../../features/applicant/applicant.type.ts";

export interface CandidateListItemProps {
    candidate: Candidate;
    isSelected: boolean;
    onSelect: (candidate: Candidate) => void;
}

export interface CandidateListProps {
    candidates: Candidate[];
    selectedId: string | null;
    isLoading?: boolean;
    pageSize?: number;
    onSelect: (candidate: Candidate) => void;
}
