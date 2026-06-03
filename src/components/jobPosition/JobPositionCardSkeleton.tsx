import {useTranslation} from 'react-i18next';

export const JobPositionCardSkeleton = () => {
    const {t} = useTranslation();

    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-pulse"
            role="status"
            aria-label={t('common.loading', 'Caricamento...')}
        >
            <div className="flex items-center space-x-2">
                <div className="size-5 rounded bg-slate-200"/>
                <div className="h-3 w-44 rounded bg-slate-200"/>
            </div>
            <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-slate-200"/>
                <div className="h-4 w-56 rounded bg-slate-200"/>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                    <div className="h-3 w-full rounded bg-slate-200"/>
                    <div className="h-3 w-3/4 rounded bg-slate-200"/>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 w-36 rounded bg-slate-200"/>
                <div className="space-y-1.5 pl-4">
                    <div className="h-3 w-full rounded bg-slate-100"/>
                    <div className="h-3 w-5/6 rounded bg-slate-100"/>
                    <div className="h-3 w-4/5 rounded bg-slate-100"/>
                </div>
            </div>
            <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="h-3 w-32 rounded bg-slate-200"/>
                <div className="space-y-1.5 pl-4">
                    <div className="h-3 w-full rounded bg-slate-100"/>
                    <div className="h-3 w-5/6 rounded bg-slate-100"/>
                    <div className="h-3 w-4/5 rounded bg-slate-100"/>
                </div>
            </div>
        </div>
    );
};
