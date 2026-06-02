import {useTranslation} from 'react-i18next';
import {MagnifyingGlassIcon, ArrowsUpDownIcon, XMarkIcon} from '@heroicons/react/24/outline';

import {IFilterList, FilterLIstProps} from "./FilterList.type.ts";
import {DEFAULT_FILTERS, SORT_OPTIONS, STATUS_OPTIONS} from "../../constants/filter.constant.ts";
import {CandidateStatus} from "../../features/applicant/applicant.type.ts";


export const FilterList = ({filters, departments, isLoading = false, onFiltersChange}: FilterLIstProps) => {
    const {t} = useTranslation();

    const updateFilter = (key: keyof IFilterList, value: string) => {
        onFiltersChange({...filters, [key]: value});
    };

    const isFiltered = filters.search !== DEFAULT_FILTERS.search
        || filters.department !== DEFAULT_FILTERS.department
        || filters.status !== DEFAULT_FILTERS.status
        || filters.sortBy !== DEFAULT_FILTERS.sortBy;

    const resetFilters = () => {
        onFiltersChange({...DEFAULT_FILTERS});
    };

    if (isLoading) {
        return (
            <div
                className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-3 sm:p-4 sm:space-y-4 animate-pulse"
                role="status"
                aria-label={t('common.loading', 'Caricamento...')}
            >
                <div className="h-9 w-full rounded-full bg-slate-200"/>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="h-8 rounded-full bg-slate-100"/>
                    <div className="h-8 rounded-full bg-slate-100"/>
                    <div className="h-8 w-2/3 rounded-full bg-slate-100 sm:w-1/2"/>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-3 sm:p-4 sm:space-y-4">
            {/* Search */}
            <div className="relative">
                <MagnifyingGlassIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 sm:left-4"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    placeholder={t('candidates.search_placeholder', 'Cerca per nome, email, ruolo...')}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-primary-500 focus:bg-white rounded-full py-2.5 pl-10 pr-4 text-sm outline-none transition-all sm:py-2 sm:pl-11 sm:text-xs"
                    aria-label={t('candidates.search_label', 'Cerca candidati')}
                />
            </div>

            {/* Filters — 1 col mobile, 2 col da sm in su */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {/* Department filter */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-2 transition-colors hover:bg-slate-100 sm:py-1.5">
                    <span className="text-slate-400 text-xs font-medium mr-1 shrink-0">
                        {t('candidates.filter_dept', 'Dip:')}
                    </span>
                    <select
                        value={filters.department}
                        onChange={(e) => updateFilter('department', e.target.value)}
                        className="bg-transparent text-slate-700 text-xs font-semibold outline-none border-none cursor-pointer w-full min-w-0"
                        aria-label={t('candidates.filter_dept_label', 'Filtra per dipartimento')}
                    >
                        <option value="all">{t('candidates.filter_all_depts', 'Tutti i settori')}</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                {/* Status filter */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-2 transition-colors hover:bg-slate-100 sm:py-1.5">
                    <span className="text-slate-400 text-xs font-medium mr-1 shrink-0">
                        {t('candidates.filter_status', 'Stato:')}
                    </span>
                    <select
                        value={filters.status}
                        onChange={(e) => updateFilter('status', e.target.value as CandidateStatus | 'all')}
                        className="bg-transparent text-slate-700 text-xs font-semibold outline-none border-none cursor-pointer w-full min-w-0"
                        aria-label={t('candidates.filter_status_label', 'Filtra per stato')}
                    >
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>{t(s.labelKey, s.labelFallback)}</option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-2 transition-colors hover:bg-slate-100 sm:py-1.5 sm:w-fit">
                    <ArrowsUpDownIcon className="size-3 text-slate-400 mr-1.5 shrink-0" aria-hidden="true"/>
                    <span className="text-slate-400 text-xs font-medium mr-1 shrink-0">
                        {t('candidates.sort_label', 'Ordina:')}
                    </span>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => updateFilter('sortBy', e.target.value)}
                        className="bg-transparent text-slate-700 text-xs font-semibold outline-none border-none cursor-pointer w-full min-w-0"
                        aria-label={t('candidates.sort_aria_label', 'Ordina candidati')}
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{t(opt.labelKey, opt.labelFallback)}</option>
                        ))}
                    </select>
                </div>

                {/* Reset filters */}
                <button
                    onClick={resetFilters}
                    disabled={!isFiltered}
                    className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-white rounded-xl text-[11px] font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer sm:py-1.5"
                    aria-label={t('common.reset_filters', 'Resetta filtri')}
                >
                    <XMarkIcon className="size-3 shrink-0" aria-hidden="true"/>
                    <span>{t('common.reset_filters', 'Resetta filtri')}</span>
                </button>
            </div>
        </div>
    );
};
