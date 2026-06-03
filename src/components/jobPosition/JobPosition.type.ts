import type {JobPosition} from '../../features/applicant/applicant.type';

export interface JobPositionCardProps {
    role: string;
    department: string;
    jobPosition: JobPosition;
}
