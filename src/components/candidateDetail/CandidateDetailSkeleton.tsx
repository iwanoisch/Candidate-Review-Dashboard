import {useTranslation} from 'react-i18next';

export const CandidateDetailSkeleton = () => {
    const {t} = useTranslation();

    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sm:p-6 animate-pulse"
            role="status"
            aria-label={t('common.loading', 'Caricamento...')}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: Avatar + Info */}
                <div className="flex items-center space-x-4">
                    <div className="size-16 rounded-2xl bg-slate-200"/>
                    <div>
                        <div className="flex items-center space-x-2.5">
                            <div className="h-6 w-40 rounded-lg bg-slate-200"/>
                            <div className="h-5 w-20 rounded-md bg-slate-100"/>
                        </div>
                        <div className="h-3 w-56 rounded bg-slate-100 mt-2"/>
                        <div className="flex items-center gap-3.5 mt-3">
                            <div className="h-3 w-36 rounded bg-slate-100"/>
                            <div className="h-3 w-28 rounded bg-slate-100"/>
                        </div>
                    </div>
                </div>

                {/* Right: Match score */}
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl self-start flex sm:flex-col items-center justify-center gap-2 sm:gap-1">
                    <div className="h-2.5 w-16 rounded bg-slate-200"/>
                    <div className="h-7 w-14 rounded bg-slate-200 sm:mt-1"/>
                </div>
            </div>
        </div>
    );
};
