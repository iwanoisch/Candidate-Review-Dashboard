import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {ApplicantState, ApplicantStats, Candidate} from './applicant.type';
import type {IPagination} from '../../hooks/api/useApiClient.type';

const initialState: ApplicantState = {
    candidates: [],
    selectedCandidate: null,
    pagination: null,
    stats: null,
};

export const applicantSlice = createSlice({
    name: 'applicant',
    initialState,
    reducers: {
        loadCandidates: (state, action: PayloadAction<{ candidates: Candidate[]; pagination: IPagination | null }>) => {
            state.candidates = action.payload.candidates;
            state.pagination = action.payload.pagination;
        },

        loadStats: (state, action: PayloadAction<ApplicantStats>) => {
            state.stats = action.payload;
        },

        selectCandidate: (state, action: PayloadAction<Candidate | null>) => {
            state.selectedCandidate = action.payload;
        },
    },
});

export const {
    loadCandidates,
    loadStats,
    selectCandidate,
} = applicantSlice.actions;

export default applicantSlice.reducer;
