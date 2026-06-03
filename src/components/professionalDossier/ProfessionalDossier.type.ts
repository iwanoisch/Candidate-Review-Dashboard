import type {SoftSkill} from '../../features/applicant/applicant.type';

export interface ProfessionalDossierProps {
    summary: string;
    matchReason: string;
    softSkills: SoftSkill[];
}
