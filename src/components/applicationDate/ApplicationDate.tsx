import {useTranslation} from 'react-i18next';
import {CalendarIcon} from '@heroicons/react/24/outline';

import type {ApplicationDateProps} from './ApplicationDate.type';

export const ApplicationDate = ({date}: ApplicationDateProps) => {
    const {t} = useTranslation();

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3"
            aria-label={t('application_date.section_label')}
        >
            <div className="bg-indigo-50 text-indigo-700 p-2.5 rounded-xl border border-indigo-100 shrink-0">
                <CalendarIcon className="size-4" aria-hidden="true"/>
            </div>
            <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block leading-none">
                    {t('application_date.label')}
                </span>
                <time
                    dateTime={date}
                    className="font-mono text-xs font-semibold text-slate-700 block mt-1"
                >
                    {date}
                </time>
            </div>
        </article>
    );
};
