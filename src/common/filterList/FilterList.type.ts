export interface FilterLIstProps {
    filters: IFilterList;
    departments: string[];
    isLoading?: boolean;
    onFiltersChange: (filters: IFilterList) => void;
}

export interface IFilterList {
    search: string;
    department: string;
    status: string;
    sortBy: string;
}
