import type {Candidate} from '../features/applicant/applicant.type';
import type {IFilterList} from '../common/filterList/FilterList.type.ts';

export function filterCandidates(candidates: Candidate[], filters: IFilterList): Candidate[] {
    let result = [...candidates];

    if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.email.toLowerCase().includes(query) ||
            c.role.toLowerCase().includes(query)
        );
    }

    if (filters.department !== 'all') {
        result = result.filter(c => c.department === filters.department);
    }

    if (filters.status !== 'all') {
        result = result.filter(c => c.status === filters.status);
    }

    switch (filters.sortBy) {
        case 'score_desc':
            result.sort((a, b) => b.score - a.score);
            break;
        case 'applied_desc':
            result.sort((a, b) => b.appliedDate.localeCompare(a.appliedDate));
            break;
        case 'experience_desc':
            result.sort((a, b) => b.experienceYears - a.experienceYears);
            break;
        case 'alpha_asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    return result;
}

export function extractDepartments(candidates: Candidate[]): string[] {
    return [...new Set(candidates.map(c => c.department))].sort();
}
