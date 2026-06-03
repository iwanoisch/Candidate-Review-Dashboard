import {useTranslation} from 'react-i18next';

export const PipelineRecruitmentSkeleton = () => {
    const {t} = useTranslation();

    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-pulse"
            role="status"
            aria-label={t('common.loading', 'Caricamento...')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2">
                <div className="size-5 rounded bg-slate-200"/>
                <div className="h-3 w-36 rounded bg-slate-200"/>
            </div>

            {/* Status label */}
            <div className="h-3 w-48 rounded bg-slate-200"/>

            {/* Buttons grid */}
            <div className="grid grid-cols-2 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="min-h-12 rounded-xl bg-slate-100 border border-slate-200"/>
                ))}
            </div>
        </div>
    );
};
