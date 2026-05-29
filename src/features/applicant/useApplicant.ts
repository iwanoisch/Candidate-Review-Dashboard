import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {loadCandidates, loadStats, selectCandidate} from './applicantSlice.ts';
import {APPLICANT_DATA_MOCK} from "../../data_mock/APPLICANT_DATA_MOCK.ts";
import {APPLICANT_STATS_MOCK} from "../../data_mock/APPLICANT_STATS_MOCK.ts";
import type {Candidate, ApplicantStats} from './applicant.type';
import type {IApiResponse} from "../../hooks/api/useApiClient.type.ts";

export const useApplicant = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.applicant);

    const getCandidates = async (): Promise<IApiResponse<Candidate[]> | null> => {
        try {
            // TODO: sostituire con get<IApiResponse<Candidate[]>>('/candidates')
            const response: IApiResponse<Candidate[]> = {
                data: APPLICANT_DATA_MOCK,
                meta: {
                    success: true,
                    status: 200,
                    message: null,
                    pagination: {
                        currentPage: 1,
                        pageSize: APPLICANT_DATA_MOCK.length,
                        totalPages: 1,
                    },
                },
            };

            dispatch(loadCandidates({
                candidates: response.data,
                pagination: response.meta.pagination,
            }));
            return response;
        } catch {
            return null;
        }
    };

    const getApplicantStats = async (): Promise<IApiResponse<ApplicantStats> | null> => {
        try {
            // TODO: sostituire con get<IApiResponse<ApplicantStats>>('/candidates/stats')
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

    const clearSelection = () => {
        dispatch(selectCandidate(null));
    };

    return {
        ...state,
        getCandidates,
        getApplicantStats,
        clearSelection,
    };
};
