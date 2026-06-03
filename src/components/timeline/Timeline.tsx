import {useTranslation} from 'react-i18next';
import {ClockIcon} from '@heroicons/react/24/outline';
import type {TimelineProps} from './Timeline.type';
import TimelineItem from "./TimelineItem.tsx";


export const Timeline = ({events}: TimelineProps) => {
    const {t} = useTranslation();

    return (
        <article
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
            aria-label={t('timeline.section_label', 'Timeline storico')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2 text-slate-800">
                <ClockIcon className="size-5 shrink-0 text-slate-500" aria-hidden="true"/>
                <h3 className="font-bold text-xs uppercase tracking-widest">
                    {t('timeline.title', 'Timeline Storico')} ({events.length})
                </h3>
            </div>

            {/* Timeline */}
            {events.length > 0 ? (
                <div
                    className="relative pl-6 space-y-5 border-l-2 border-slate-100 ml-2.5 max-h-72 overflow-y-auto pr-1"
                    role="list"
                    aria-label={t('timeline.list_label', 'Lista eventi')}
                >
                    {events.map((event) => (
                        <div key={event.id} role="listitem">
                            <TimelineItem event={event}/>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xs text-slate-400 text-center py-4">
                    {t('timeline.empty', 'Nessun evento registrato')}
                </p>
            )}
        </article>
    );
};
