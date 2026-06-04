import reducer, {loadCandidates, appendCandidates, loadStats, selectCandidate} from '../applicantSlice';
import type {ApplicantState, Candidate, CandidateDetail, ApplicantStats} from '../applicant.type';
import type {IPagination} from '../../../hooks/api/useApiClient.type';

const makePagination = (page = 1, total = 10): IPagination => ({
    currentPage: page,
    pageSize: 10,
    totalPages: Math.ceil(total / 10),
    totalItems: total,
});

const makeCandidate = (overrides: Partial<Candidate> = {}): Candidate => ({
    id: '1',
    name: 'Mario Rossi',
    email: 'mario@test.com',
    phone: '+39 333 1234567',
    avatar: 'https://example.com/avatar.jpg',
    role: 'Frontend Developer',
    department: 'Engineering',
    score: 85,
    experienceYears: 5,
    appliedDate: '2026-01-15',
    status: 'under_review' as Candidate['status'],
    tags: ['react', 'typescript'],
    ...overrides,
});

const makeCandidateDetail = (overrides: Partial<CandidateDetail> = {}): CandidateDetail => ({
    ...makeCandidate(),
    jobPosition: null,
    summary: 'Ottimo candidato',
    matchReason: 'Esperienza rilevante',
    softSkills: [],
    notes: null,
    timeline: null,
    ...overrides,
});

const initialState: ApplicantState = {
    candidates: [],
    selectedCandidate: null,
    pagination: null,
    stats: null,
};

describe('applicantSlice', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    describe('loadCandidates', () => {
        it('should set candidates and pagination', () => {
            const candidates = [makeCandidate({id: '1'}), makeCandidate({id: '2', name: 'Luigi Verdi'})];
            const pagination = makePagination(1, 2);

            const result = reducer(initialState, loadCandidates({candidates, pagination}));

            expect(result.candidates).toEqual(candidates);
            expect(result.candidates).toHaveLength(2);
            expect(result.pagination).toEqual(pagination);
        });

        it('should replace previous candidates, not append', () => {
            const stateWithCandidates: ApplicantState = {
                ...initialState,
                candidates: [makeCandidate({id: 'old-1'}), makeCandidate({id: 'old-2'})],
                pagination: makePagination(1, 2),
            };
            const newCandidates = [makeCandidate({id: 'new-1'})];
            const newPagination = makePagination(1, 1);

            const result = reducer(stateWithCandidates, loadCandidates({candidates: newCandidates, pagination: newPagination}));

            expect(result.candidates).toHaveLength(1);
            expect(result.candidates[0].id).toBe('new-1');
            expect(result.pagination).toEqual(newPagination);
        });

        it('should handle empty array', () => {
            const stateWithCandidates: ApplicantState = {
                ...initialState,
                candidates: [makeCandidate()],
                pagination: makePagination(1, 1),
            };
            const pagination = makePagination(1, 0);

            const result = reducer(stateWithCandidates, loadCandidates({candidates: [], pagination}));

            expect(result.candidates).toEqual([]);
            expect(result.candidates).toHaveLength(0);
            expect(result.pagination).toEqual(pagination);
        });
    });

    describe('appendCandidates', () => {
        it('should add to existing candidates', () => {
            const existing = [makeCandidate({id: '1'})];
            const stateWithCandidates: ApplicantState = {
                ...initialState,
                candidates: existing,
                pagination: makePagination(1, 20),
            };
            const newCandidates = [makeCandidate({id: '2'}), makeCandidate({id: '3'})];
            const newPagination = makePagination(2, 20);

            const result = reducer(stateWithCandidates, appendCandidates({candidates: newCandidates, pagination: newPagination}));

            expect(result.candidates).toHaveLength(3);
            expect(result.candidates[0].id).toBe('1');
            expect(result.candidates[1].id).toBe('2');
            expect(result.candidates[2].id).toBe('3');
            expect(result.pagination).toEqual(newPagination);
        });

        it('should keep existing candidates when appending empty array', () => {
            const existing = [makeCandidate({id: '1'}), makeCandidate({id: '2'})];
            const pagination = makePagination(1, 2);
            const stateWithCandidates: ApplicantState = {
                ...initialState,
                candidates: existing,
                pagination,
            };
            const newPagination = makePagination(2, 2);

            const result = reducer(stateWithCandidates, appendCandidates({candidates: [], pagination: newPagination}));

            expect(result.candidates).toHaveLength(2);
            expect(result.candidates).toEqual(existing);
            expect(result.pagination).toEqual(newPagination);
        });
    });

    describe('loadStats', () => {
        it('should set stats', () => {
            const stats: ApplicantStats = {totalCandidates: 50, underReview: 12, hired: 8, avgScore: 72.5};

            const result = reducer(initialState, loadStats(stats));

            expect(result.stats).toEqual(stats);
        });

        it('should replace previous stats', () => {
            const oldStats: ApplicantStats = {totalCandidates: 10, underReview: 3, hired: 2, avgScore: 60};
            const stateWithStats: ApplicantState = {...initialState, stats: oldStats};
            const newStats: ApplicantStats = {totalCandidates: 50, underReview: 12, hired: 8, avgScore: 72.5};

            const result = reducer(stateWithStats, loadStats(newStats));

            expect(result.stats).toEqual(newStats);
            expect(result.stats).not.toEqual(oldStats);
        });
    });

    describe('selectCandidate', () => {
        it('should set selected candidate', () => {
            const detail = makeCandidateDetail({id: '42', name: 'Anna Bianchi'});

            const result = reducer(initialState, selectCandidate(detail));

            expect(result.selectedCandidate).toEqual(detail);
            expect(result.selectedCandidate?.id).toBe('42');
            expect(result.selectedCandidate?.name).toBe('Anna Bianchi');
        });

        it('should clear selection when payload is null', () => {
            const stateWithSelection: ApplicantState = {
                ...initialState,
                selectedCandidate: makeCandidateDetail(),
            };

            const result = reducer(stateWithSelection, selectCandidate(null));

            expect(result.selectedCandidate).toBeNull();
        });
    });
});
