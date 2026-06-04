import {useTranslation} from 'react-i18next';

export const ProfessionalDossierSkeleton = () => {
    const {t} = useTranslation();

    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-pulse"
            role="status"
            aria-label={t('common.loading')}
        >
            {/* Header */}
            <div className="flex items-center space-x-2">
                <div className="size-5 rounded bg-slate-200"/>
                <div className="h-3 w-40 rounded bg-slate-200"/>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                <div className="h-3 w-full rounded bg-slate-200"/>
                <div className="h-3 w-3/4 rounded bg-slate-200"/>
            </div>

            {/* Soft Skills */}
            <div className="space-y-2">
                <div className="h-3 w-48 rounded bg-slate-200"/>
                <div className="flex flex-col gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 flex items-center justify-between">
                            <div className="h-3 w-24 rounded bg-slate-200"/>
                            <div className="h-3 w-20 rounded bg-slate-200"/>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendation */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 space-y-2">
                <div className="h-3 w-36 rounded bg-emerald-200"/>
                <div className="h-3 w-full rounded bg-emerald-100"/>
                <div className="h-3 w-2/3 rounded bg-emerald-100"/>
            </div>
        </div>
    );
};
