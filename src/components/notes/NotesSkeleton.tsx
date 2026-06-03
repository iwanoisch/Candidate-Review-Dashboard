import {useTranslation} from 'react-i18next';

export const NotesSkeleton = () => {
    const {t} = useTranslation();

    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-pulse"
            role="status"
            aria-label={t('common.loading', 'Caricamento...')}
        >
            <div className="flex items-center space-x-2">
                <div className="size-5 rounded bg-slate-200"/>
                <div className="h-3 w-36 rounded bg-slate-200"/>
            </div>
            <div className="border-b border-slate-100 pb-4 space-y-3">
                <div className="h-16 w-full rounded-xl bg-slate-100"/>
                <div className="flex justify-end">
                    <div className="h-8 w-28 rounded-xl bg-slate-200"/>
                </div>
            </div>
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="h-3 w-32 rounded bg-slate-200"/>
                            <div className="h-3 w-20 rounded bg-slate-200"/>
                        </div>
                        <div className="h-3 w-full rounded bg-slate-100"/>
                        <div className="h-3 w-2/3 rounded bg-slate-100"/>
                    </div>
                ))}
            </div>
        </div>
    );
};
