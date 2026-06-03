import {useTranslation} from 'react-i18next';

export const ApplicationDateSkeleton = () => {
    const {t} = useTranslation();

    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 animate-pulse"
            role="status"
            aria-label={t('common.loading', 'Caricamento...')}
        >
            <div className="size-9 rounded-xl bg-slate-200 shrink-0"/>
            <div className="space-y-1.5">
                <div className="h-3 w-24 rounded bg-slate-200"/>
                <div className="h-3 w-20 rounded bg-slate-200"/>
            </div>
        </div>
    );
};
