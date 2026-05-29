interface CandidateListSkeletonProps {
    count?: number;
}

export const CandidateListSkeleton = ({count = 5}: CandidateListSkeletonProps) => {
    return (
        <>
            {Array.from({length: count}, (_, i) => (
                <div
                    key={i}
                    role="status"
                    aria-label="Caricamento..."
                    className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between animate-pulse"
                >
                    <div className="flex items-center gap-3 pl-1.5">
                        <div className="size-11 rounded-xl bg-slate-200"/>
                        <div className="space-y-2">
                            <div className="h-3.5 w-28 rounded bg-slate-200"/>
                            <div className="h-3 w-36 rounded bg-slate-100"/>
                            <div className="h-2.5 w-24 rounded bg-slate-100"/>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="h-5 w-12 rounded-md bg-slate-200"/>
                        <div className="h-5 w-16 rounded-lg bg-slate-100"/>
                    </div>
                </div>
            ))}
        </>
    );
};
