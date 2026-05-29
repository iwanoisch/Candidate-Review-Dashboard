import {useTranslation} from 'react-i18next';
import {CandidateListItemProps} from "./Candidate.type.ts";
import {StatusBadge} from "../../common/status-badge/StatusBadge.tsx";


export const CandidateListItem = ({candidate, isSelected, onSelect}: CandidateListItemProps) => {
    const {t} = useTranslation();

    const scoreHighlight = candidate.score >= 90;

    return (
        <button
            type="button"
            onClick={() => onSelect(candidate)}
            aria-label={`${t('candidates.select', 'Seleziona')} ${candidate.name}`}
            aria-pressed={isSelected}
            className={`w-full border rounded-2xl p-3 cursor-pointer transition-all duration-200 relative overflow-hidden group text-left sm:p-4 ${
                isSelected
                    ? 'border-primary-500 shadow-md ring-1 ring-primary-500/30 bg-white'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:shadow-sm hover:border-slate-300'
            }`}
        >
            {/* Left accent bar */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                    isSelected ? 'bg-primary-600' : 'bg-transparent group-hover:bg-slate-300'
                }`}
                aria-hidden="true"
            />

            <div className="flex items-center justify-between gap-2 pl-1.5">
                {/* Avatar + Info */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                        <img
                            alt={candidate.name}
                            src={candidate.avatar}
                            referrerPolicy="no-referrer"
                            className="size-10 rounded-xl object-cover border border-slate-200 shadow-sm sm:size-11"
                        />
                        {scoreHighlight && (
                            <span
                                className="absolute -top-1.5 -right-1.5 bg-amber-400 text-white rounded-full p-0.5 border border-white shadow-sm"
                                title={t('candidates.top_score', 'Top score')}
                                aria-label={t('candidates.top_score', 'Top score')}
                            >
                                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path
                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                                </svg>
                            </span>
                        )}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-slate-800 text-sm group-hover:text-primary-600 transition-colors truncate">
                                {candidate.name}
                            </span>
                            <span className="hidden text-xs text-slate-400 bg-slate-50 border border-slate-100 px-1.5 rounded font-mono shrink-0 sm:inline">
                                {candidate.experienceYears}y exp
                            </span>
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5 font-medium truncate">
                            {candidate.role}
                        </p>
                        <div className="hidden items-center gap-2 mt-1.5 sm:flex">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                                {candidate.department}
                            </span>
                            <span className="text-slate-200 text-xs" aria-hidden="true">&bull;</span>
                            <span className="text-xs text-slate-400 font-mono">
                                {t('candidates.registered', 'Reg:')} {candidate.appliedDate}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Score + Status */}
                <div className="flex flex-col items-end gap-1.5 shrink-0 sm:gap-2">
                    <div className="flex items-center gap-1">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md font-mono ${
                            scoreHighlight
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                            {candidate.score}
                        </span>
                        <span className="text-xs text-slate-400">/100</span>
                    </div>
                    <StatusBadge status={candidate.status}/>
                </div>
            </div>
        </button>
    );
};
