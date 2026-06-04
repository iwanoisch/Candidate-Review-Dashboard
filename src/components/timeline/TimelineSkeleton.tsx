import {useTranslation} from 'react-i18next';

export const TimelineSkeleton = () => {
    const {t} = useTranslation();

    return (
        <div
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-pulse"
            role="status"
            aria-label={t('common.loading')}
        >
            <div className="flex items-center space-x-2">
                <div className="size-5 rounded bg-slate-200"/>
                <div className="h-3 w-36 rounded bg-slate-200"/>
            </div>
            <div className="relative pl-6 space-y-5 border-l-2 border-slate-100 ml-2.5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-8 top-0.5 size-7 rounded-full bg-slate-200"/>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <div className="h-3 w-40 rounded bg-slate-200"/>
                                <div className="h-3 w-20 rounded bg-slate-200"/>
                            </div>
                            <div className="h-3 w-full rounded bg-slate-100"/>
                            <div className="h-3 w-32 rounded bg-slate-100"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
