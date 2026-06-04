import {useTranslation} from 'react-i18next';
import {BoltIcon} from '@heroicons/react/24/outline';
import {useModalDialog} from "../../common/modal-dialog/useModalDialog.ts";
import type {StatusRecruitmentProps} from './StatusRecruitment.type.ts';
import type {CandidateStatus} from '../../features/applicant/applicant.type';
import {STATUS_STEPS} from "../../constants/filter.constant.ts";

export const StatusRecruitment = ({currentStatus, isAdmin, onStatusChange}: StatusRecruitmentProps) => {
    const {t} = useTranslation();
    const {showModalDialog, hideModalDialog} = useModalDialog();

    const handleStatusClick = (newStatus: CandidateStatus) => {
        if (newStatus === currentStatus) return;

        const stepLabel = STATUS_STEPS.find(s => s.status === newStatus);
        const statusName = stepLabel ? t(stepLabel.labelKey, stepLabel.labelFallback) : newStatus;

        const modalId = showModalDialog({
            type: 'info',
            title: t('pipeline.confirm_change_title'),
            message: t('pipeline.confirm_change', {statusName}),
            focusBlocked: true,
            duration: 0,
            links: [
                {
                    text: t('common.confirm'),
                    variant: 'primary',
                    onClick: () => {
                        onStatusChange(newStatus);
                        hideModalDialog(modalId);
                    },
                },
                {
                    text: t('common.cancel'),
                    variant: 'cancel',
                    onClick: () => {
                        hideModalDialog(modalId);
                    },
                },
            ],
        });
    };

    const currentLabel = STATUS_STEPS.find(s => s.status === currentStatus);

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
            aria-label={t('pipeline.section_label')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2 text-slate-800">
                <BoltIcon className="size-5 shrink-0 text-violet-500" aria-hidden="true"/>
                <h3 className="font-bold text-xs uppercase tracking-widest">
                    {t('pipeline.title')}
                </h3>
            </div>

            {/* Status info */}
            <div className="space-y-2">
                <p className="text-slate-400 text-xs leading-relaxed uppercase tracking-wider font-semibold">
                    {t('pipeline.current_status')}
                    {' '}
                    ({t('pipeline.current_label')}: {currentLabel ? t(currentLabel.labelKey, currentLabel.labelFallback) : currentStatus})
                </p>

                {/* Pipeline Steps */}
                <div
                    className="grid grid-cols-2 gap-1.5"
                    role="radiogroup"
                    aria-label={t('pipeline.status_selection')}
                >
                    {STATUS_STEPS.map((step) => {
                        const isActive = step.status === currentStatus;
                        return (
                            <button
                                key={step.status}
                                type="button"
                                role="radio"
                                aria-checked={isActive}
                                aria-label={t(step.labelKey, step.labelFallback)}
                                onClick={() => isAdmin && handleStatusClick(step.status)}
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
