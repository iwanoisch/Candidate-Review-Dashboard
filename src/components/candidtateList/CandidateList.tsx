import {useTranslation} from 'react-i18next';
import {UIEventHandler, useCallback} from 'react';
import {CandidateListItem} from './CandidateListItem';
import {CandidateListSkeleton} from './CandidateListSkeleton';
import {CandidateListProps} from "./Candidate.type.ts";

export const CandidateList = ({candidates, selectedId, totalCount, isLoading = false, isLoadingMore = false, hasMore = false, onSelect, onLoadMore}: CandidateListProps) => {
    const {t} = useTranslation();

    const handleScroll: UIEventHandler<HTMLDivElement> = useCallback((e) => {
        if (!hasMore || isLoadingMore) return;
        const {scrollTop, scrollHeight, clientHeight} = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight < 100) {
            onLoadMore();
        }
    }, [hasMore, isLoadingMore, onLoadMore]);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {isLoading
                        ? t('candidates.list_loading')
                        : `${t('candidates.list_title')} (${candidates.length}/${totalCount ?? candidates.length})`
                    }
                </span>
            </div>

            {/* List */}
            <div className="p-3">
                {isLoading ? (
                    <div className="space-y-2">
                        <CandidateListSkeleton count={7}/>
                    </div>
                ) : candidates.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-sm text-slate-400">
                            {t('candidates.empty')}
                        </p>
                    </div>
                ) : (
                    <div
                        onScroll={handleScroll}
                        className="space-y-2 max-h-96 lg:max-h-144 overflow-y-auto overscroll-contain pr-1"
                        role="list"
                        aria-label={t('candidates.list_aria')}
                    >
                        {candidates.map((candidate) => (
                            <div key={candidate.id} role="listitem">
                                <CandidateListItem
                                    candidate={candidate}
                                    isSelected={selectedId === candidate.id}
                                    onSelect={onSelect}
                                />
                            </div>
                        ))}

                        {/* Loading skeleton */}
                        {hasMore && isLoadingMore && (
                            <div className="space-y-2 pt-1" aria-hidden="true">
                                <CandidateListSkeleton count={2}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
