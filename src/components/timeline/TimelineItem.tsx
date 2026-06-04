import type {TimelineEvent} from "../../features/applicant/applicant.type.ts";
import {useTranslation} from "react-i18next";
import {EVENT_CONFIG} from "../../constants/timeLine.constant.ts";

const TimelineItem = ({event}: { event: TimelineEvent }) => {
    const {t} = useTranslation();
    const config = EVENT_CONFIG[event.type];
    const Icon = config.icon;

    return (
        <div className="relative">
            {/* Dot */}
            <span
                className={`absolute -left-8 top-0.5 size-7 rounded-full border shadow-sm flex items-center justify-center ${config.bg} ${config.border}`}
                aria-hidden="true"
            >
                <Icon className={`size-3.5 ${config.iconColor}`}/>
            </span>

            {/* Content */}
            <div>
                <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-slate-700 text-xs tracking-tight">
                        {event.title}
                    </h4>
                    <time
                        dateTime={event.date}
                        className="text-xs font-mono text-slate-400 shrink-0"
                    >
                        {event.date}
                    </time>
                </div>
                <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                    {event.description}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 font-medium">
                    <span>{t('timeline.performed_by')}: {event.author}</span>
                    <span className="text-slate-300" aria-hidden="true">&bull;</span>
                    <span className="font-mono uppercase bg-slate-50 border border-slate-200 rounded px-1 text-xs">
                        {event.authorRole}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TimelineItem
