interface StatCardSkeletonProps {
    count?: number;
}

export const StatCardSkeleton = ({count = 4}: StatCardSkeletonProps) => {
    return (
        <>
            {Array.from({length: count}, (_, i) => (
                <div
                    key={i}
                    role="status"
                    aria-label="Caricamento..."
                    className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between animate-pulse"
                >
                    <div className="flex items-start justify-between">
                        <div className="h-3 w-24 rounded bg-slate-200"/>
                        <div className="size-9 rounded-xl bg-slate-200"/>
                    </div>
                    <div className="mt-5 space-y-2">
                        <div className="h-8 w-16 rounded bg-slate-200"/>
                        <div className="h-3 w-32 rounded bg-slate-100"/>
                    </div>
                </div>
            ))}
        </>
    );
};
