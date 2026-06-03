import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {loadCandidates, appendCandidates, loadStats, selectCandidate} from './applicantSlice.ts';
import {APPLICANT_DATA_MOCK} from "../../data_mock/APPLICANT_DATA_MOCK.ts";
import {APPLICANT_DETAIL_MOCK} from "../../data_mock/APPLICANT_DETAIL_MOCK.ts";
import {APPLICANT_STATS_MOCK} from "../../data_mock/APPLICANT_STATS_MOCK.ts";
import {filterCandidates} from "../../utility/candidate-filter.utils.ts";
import type {ApplicantStats, CandidateDetail, CandidateStatus} from './applicant.type';
import type {IApiResponse} from "../../hooks/api/useApiClient.type.ts";
import type {IFilterList} from "../../common/filterList/FilterList.type.ts";

const DEFAULT_PAGE_SIZE = 7;

export const useApplicant = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.applicant);

    const getCandidates = async (filters: IFilterList, page: number = 1, pageSize: number = DEFAULT_PAGE_SIZE): Promise<boolean> => {
        try {
            // TODO: sostituire con get<IApiResponse<Candidate[]>>('/candidates', { ...filters, page, pageSize })
            // TODO: rimuovere il timeout, simula latenza backend
            await new Promise(resolve => setTimeout(resolve, 800));
            const filtered = filterCandidates(APPLICANT_DATA_MOCK, filters);

            const totalPages = Math.ceil(filtered.length / pageSize);
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const pageData = filtered.slice(start, end);

            const pagination = {currentPage: page, pageSize, totalPages, totalItems: filtered.length};

            if (page === 1) {
                dispatch(loadCandidates({candidates: pageData, pagination}));
            } else {
                dispatch(appendCandidates({candidates: pageData, pagination}));
            }

            return true;
        } catch {
            return false;
        }
    };

    const getApplicantStats = async (): Promise<IApiResponse<ApplicantStats> | null> => {
        try {
            // TODO: sostituire con get<IApiResponse<ApplicantStats>>('/candidates/stats')
            // TODO: rimuovere il timeout, simula latenza backend
            await new Promise(resolve => setTimeout(resolve, 800));
            const response: IApiResponse<ApplicantStats> = {
                data: APPLICANT_STATS_MOCK,
                meta: {
                    success: true,
                    status: 200,
                    message: null,
                    pagination: null,
                },
            };

            dispatch(loadStats(response.data));
            return response;
        } catch {
            return null;
        }
    };

    const getCandidateDetail = async (candidateId: string): Promise<CandidateDetail | null> => {
        try {
            // TODO: sostituire con get<IApiResponse<CandidateDetail>>(`/candidates/${candidateId}`)
            await new Promise(resolve => setTimeout(resolve, 600));
            const detail = APPLICANT_DETAIL_MOCK[candidateId] ?? null;
            dispatch(selectCandidate(detail));
            return detail;
        } catch {
            return null;
        }
    };

    const changeCandidateStatus = (status: CandidateStatus) => {
        // TODO: sostituire con chiamata API put/patch
        if (state.selectedCandidate) {
            dispatch(selectCandidate({...state.selectedCandidate, status}));
        }
    };

    const clearSelection = () => {
        dispatch(selectCandidate(null));
    };

    return {
        ...state,
        getCandidates,
        getCandidateDetail,
        getApplicantStats,
        changeCandidateStatus,
        clearSelection,
    };
};
