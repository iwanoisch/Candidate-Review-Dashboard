import {useTranslation} from 'react-i18next';
import {EnvelopeIcon, PhoneIcon, ClipboardDocumentIcon} from '@heroicons/react/24/outline';

import type {CandidateDetailProps} from './CandidateDetail.type';
import {StatusBadge} from '../../common/status-badge/StatusBadge';

export const CandidateDetail = ({candidate}: CandidateDetailProps) => {
    const {t} = useTranslation();

    const copyEmail = async () => {
        await navigator.clipboard.writeText(candidate.email);
    };

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sm:p-6"
            aria-label={t('candidates.detail_section', 'Dettaglio candidato')}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: Avatar + Info */}
                <div className="flex items-center space-x-4">
                    <img
                        alt={candidate.name}
                        src={candidate.avatar}
                        referrerPolicy="no-referrer"
                        className="size-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                    />
                    <div>
                        <div className="flex items-center space-x-2.5 flex-wrap">
                            <h2 className="font-bold text-slate-800 text-xl tracking-tight leading-tight">
                                {candidate.name}
                            </h2>
                            <StatusBadge status={candidate.status} size="sm"/>
                        </div>

                        <p className="text-slate-500 font-medium text-xs mt-1">
                            {candidate.role}
                            {' '}
                            <span className="text-slate-300" aria-hidden="true">&bull;</span>
                            {' '}
                            <span className="text-slate-400 font-semibold">{candidate.department}</span>
                        </p>

                        {/* Contact info */}
                        <div className="flex flex-wrap items-center gap-3.5 mt-2.5 text-slate-500 text-[11px] font-medium">
                            <button
                                type="button"
                                onClick={copyEmail}
                                className="flex items-center space-x-1.5 hover:text-primary-600 transition-colors cursor-pointer focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                                title={t('candidates.copy_email')}
                                aria-label={t('candidates.copy_email', 'Copia email')}
                            >
                                <EnvelopeIcon className="size-3.5 shrink-0" aria-hidden="true"/>
                                <span className="underline">{candidate.email}</span>
                                <ClipboardDocumentIcon className="size-2.5 opacity-60 shrink-0" aria-hidden="true"/>
                            </button>

                            <div className="flex items-center space-x-1.5">
                                <PhoneIcon className="size-3.5 shrink-0" aria-hidden="true"/>
                                <span>{candidate.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Match score */}
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-center self-start flex sm:flex-col items-center justify-center gap-2 sm:gap-0 select-none">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                        {t('candidates.match_overall')}
                    </span>
                    <div className="text-slate-800 font-mono font-bold text-2xl mt-0 sm:mt-0.5 leading-none">
                        {candidate.score}
                        <span className="text-slate-400 text-xs font-normal">/100</span>
                    </div>
                </div>
            </div>
        </article>
    );
};
