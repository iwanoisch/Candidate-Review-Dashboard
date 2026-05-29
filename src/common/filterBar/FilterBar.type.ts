export interface CandidateSearchBarProps {
    filters: CandidateFilters;
    departments: string[];
    isLoading?: boolean;
    onFiltersChange: (filters: CandidateFilters) => void;
}

export interface CandidateFilters {
    search: string;
    department: string;
    status: string;
    sortBy: string;
}
