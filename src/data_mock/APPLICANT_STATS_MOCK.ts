import type {ApplicantStats} from "../features/applicant/applicant.type";
import {APPLICANT_DATA_MOCK} from "./APPLICANT_DATA_MOCK";

const candidates = APPLICANT_DATA_MOCK;

const underReviewStatuses = ['Screening', 'Interviewing'];
const underReview = candidates.filter(c => underReviewStatuses.includes(c.status)).length;
const hired = candidates.filter(c => c.status === 'Hired').length;
const avgScore = Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length);

export const APPLICANT_STATS_MOCK: ApplicantStats = {
    totalCandidates: candidates.length,
    underReview,
    hired,
    avgScore,
};
