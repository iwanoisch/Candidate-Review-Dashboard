import {useTranslation} from 'react-i18next';
import {BriefcaseIcon} from '@heroicons/react/24/outline';
import type {JobPositionCardProps} from './JobPosition.type';

export const JobPositionCard = ({role, department, jobPosition}: JobPositionCardProps) => {
    const {t} = useTranslation();

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
            aria-label={t('job_position.section_label')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2 text-slate-800">
                <BriefcaseIcon className="size-5 shrink-0 text-primary-600" aria-hidden="true"/>
                <h3 className="font-bold text-xs uppercase tracking-widest">
                    {t('job_position.title')}
                </h3>
            </div>

            {/* Role & Department */}
            <section aria-label={t('job_position.role_section')}>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    {t('job_position.role_label')}
                </span>
                <h4 className="text-slate-800 font-bold text-sm mt-0.5">
                    {role}
                    {' '}
                    <span className="text-slate-400 font-medium text-xs">({department})</span>
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {jobPosition.description}
                </p>
            </section>

            {/* Responsibilities & Requirements */}
            <div className="space-y-4">
                {jobPosition.responsibilities.length > 0 && (
                    <section aria-label={t('job_position.responsibilities_label')}>
                        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                            {t('job_position.responsibilities')}
                        </span>
                        <ul className="space-y-1 text-slate-600 text-xs list-disc pl-4 leading-relaxed">
                            {jobPosition.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {jobPosition.requirements.length > 0 && (
                    <section
                        className="pt-3 border-t border-slate-100"
                        aria-label={t('job_position.requirements_label')}
                    >
                        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                            {t('job_position.requirements')}
                        </span>
                        <ul className="space-y-1 text-slate-600 text-xs list-disc pl-4 leading-relaxed">
                            {jobPosition.requirements.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </article>
    );
};
