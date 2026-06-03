import {useTranslation} from 'react-i18next';
import {BoltIcon} from '@heroicons/react/24/outline';
import type {PipelineRecruitmentProps} from './PipelineRecruitment.type';
import {PIPELINE_STEPS} from "../../constants/filter.constant.ts";

export const PipelineRecruitment = ({currentStatus, isAdmin, onStatusChange}: PipelineRecruitmentProps) => {
    const {t} = useTranslation();

    const currentLabel = PIPELINE_STEPS.find(s => s.status === currentStatus);

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
            aria-label={t('pipeline.section_label', 'Pipeline recruitment')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2 text-slate-800">
                <BoltIcon className="size-5 shrink-0 text-violet-500" aria-hidden="true"/>
                <h3 className="font-bold text-xs uppercase tracking-widest">
                    {t('pipeline.title', 'Pipeline Recruitment')}
                </h3>
            </div>

            {/* Status info */}
            <div className="space-y-2">
                <p className="text-slate-400 text-xs leading-relaxed uppercase tracking-wider font-semibold">
                    {t('pipeline.current_status', 'Avanzamento Stato')}
                    {' '}
                    ({t('pipeline.current_label', 'Stato Corrente')}: {currentLabel ? t(currentLabel.labelKey, currentLabel.labelFallback) : currentStatus})
                </p>

                {/* Pipeline Steps */}
                <div
                    className="grid grid-cols-2 gap-1.5"
                    role="radiogroup"
                    aria-label={t('pipeline.status_selection', 'Selezione stato candidato')}
                >
                    {PIPELINE_STEPS.map((step) => {
                        const isActive = step.status === currentStatus;
                        return (
                            <button
                                key={step.status}
                                type="button"
                                role="radio"
                                aria-checked={isActive}
                                aria-label={t(step.labelKey, step.labelFallback)}
                                onClick={() => isAdmin && onStatusChange(step.status)}
                                disabled={!isAdmin}
                                className={`min-h-12 px-3 py-2 flex items-center justify-center text-center text-xs font-semibold rounded-xl border transition-all duration-150 ${
                                    isActive
                                        ? 'bg-primary-600 border-primary-700 text-white shadow-sm'
                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                                } ${isAdmin ? 'cursor-pointer' : 'cursor-default opacity-60'}`}
                            >
                                {t(step.labelKey, step.labelFallback)}
                            </button>
                        );
                    })}
                </div>
            </div>
        </article>
    );
};
