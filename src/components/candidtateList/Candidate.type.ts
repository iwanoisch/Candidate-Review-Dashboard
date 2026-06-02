import {Candidate} from "../../features/applicant/applicant.type.ts";

export interface CandidateListItemProps {
    candidate: Candidate;
    isSelected: boolean;
    onSelect: (candidate: Candidate) => void;
}

export interface CandidateListProps {
    candidates: Candidate[];
    selectedId: string | null;
    totalCount?: number;
    isLoading?: boolean;
    isLoadingMore?: boolean;
    hasMore?: boolean;
    onSelect: (candidate: Candidate) => void;
    onLoadMore: () => void;
}
