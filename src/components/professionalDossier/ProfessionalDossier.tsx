import {useTranslation} from 'react-i18next';
import {BookOpenIcon, TrophyIcon} from '@heroicons/react/24/outline';
import type {ProfessionalDossierProps} from './ProfessionalDossier.type';
import StarRating from "../../common/star-rating/StarRating.tsx";

export const ProfessionalDossier = ({summary, matchReason, softSkills}: ProfessionalDossierProps) => {
    const {t} = useTranslation();

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
            aria-label={t('dossier.section_label')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2 text-slate-800">
                <BookOpenIcon className="size-5 shrink-0 text-primary-600" aria-hidden="true"/>
                <h3 className="font-bold text-xs uppercase tracking-widest">
                    {t('dossier.title')}
                </h3>
            </div>

            {/* Summary */}
            <div className="text-slate-600 text-xs leading-relaxed">
                <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {summary}
                </p>
            </div>

            {/* Soft Skills */}
            {softSkills.length > 0 && (
                <section aria-label={t('dossier.soft_skills_label')}>
                    <h4 className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2.5">
                        {t('dossier.soft_skills')}
                    </h4>
                    <div className="flex flex-col gap-2">
                        {softSkills.map((skill) => (
                            <StarRating key={skill.name} skill={skill}/>
                        ))}
                    </div>
                </section>
            )}

            {/* Recommendation */}
            {matchReason && (
                <div
                    className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start space-x-2.5"
                    role="note"
                >
                    <TrophyIcon className="size-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true"/>
                    <div>
                        <span className="text-emerald-900 font-semibold text-xs tracking-tight block">
                            {t('dossier.recommendation_title')}
                        </span>
                        <p className="text-emerald-800 text-xs leading-relaxed mt-1">
                            {matchReason}
                        </p>
                    </div>
                </div>
            )}
        </article>
    );
};
