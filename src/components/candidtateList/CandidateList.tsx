import {useTranslation} from 'react-i18next';
import {useEffect, useRef, useState} from 'react';
import {CandidateListItem} from './CandidateListItem';
import {CandidateListSkeleton} from './CandidateListSkeleton';
import {CandidateListProps} from "./Candidate.type.ts";

export const CandidateList = ({candidates, selectedId, isLoading = false, pageSize = 7, onSelect}: CandidateListProps) => {
    const {t} = useTranslation();
    const [visibleCount, setVisibleCount] = useState(pageSize);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Reset quando cambiano i candidati (filtri/search)
    useEffect(() => {
        setVisibleCount(pageSize);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [candidates, pageSize]);

    const visibleCandidates = candidates.slice(0, visibleCount);
    const hasMore = visibleCount < candidates.length;

    // IntersectionObserver con root = scroll container
    useEffect(() => {
        const sentinel = sentinelRef.current;
        const scrollContainer = scrollContainerRef.current;
        if (!sentinel || !scrollContainer || !hasMore || isLoadingMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoadingMore(true);
                    // TODO: rimuovere il timeout, simula latenza backend
                    setTimeout(() => {
                        setVisibleCount(prev => Math.min(prev + pageSize, candidates.length));
                        setIsLoadingMore(false);
                    }, 800);
                }
            },
            {
                root: scrollContainer,
                rootMargin: '0px 0px 100px 0px',
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, pageSize, candidates.length]);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {isLoading
                        ? t('candidates.list_loading', 'Caricamento...')
                        : `${t('candidates.list_title', 'Candidati')} (${candidates.length})`
                    }
                </span>
                {!isLoading && hasMore && (
                    <span className="text-xs text-slate-400">
                        {visibleCount}/{candidates.length}
                    </span>
                )}
            </div>

            {/* List */}
            <div className="p-3">
                {isLoading ? (
                    <div className="space-y-2">
                        <CandidateListSkeleton count={pageSize}/>
                    </div>
                ) : candidates.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-sm text-slate-400">
                            {t('candidates.empty', 'Nessun candidato trovato')}
                        </p>
                    </div>
                ) : (
                    <div
                        ref={scrollContainerRef}
                        className="space-y-2 max-h-144 overflow-y-auto pr-1"
                        role="list"
                        aria-label={t('candidates.list_aria', 'Lista candidati')}
                    >
                        {visibleCandidates.map((candidate) => (
                            <div key={candidate.id} role="listitem">
                                <CandidateListItem
                                    candidate={candidate}
                                    isSelected={selectedId === candidate.id}
                                    onSelect={onSelect}
                                />
                            </div>
                        ))}

                        {/* Sentinel + skeleton */}
                        {hasMore && (
                            isLoadingMore ? (
                                <div className="space-y-2 pt-1" aria-hidden="true">
                                    <CandidateListSkeleton count={2}/>
                                </div>
                            ) : (
                                <div ref={sentinelRef} className="h-1" aria-hidden="true"/>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
