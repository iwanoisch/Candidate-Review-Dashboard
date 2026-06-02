import {useTranslation} from "react-i18next";
import {useAuth} from "../../features/auth/useAuth.ts";
import {StatCard} from "../../common/stat-card/StatCard.tsx";
import {StatCardSkeleton} from "../../common/stat-card/StatCardSkeleton.tsx";
import {
    UsersIcon,
    FlagIcon,
    UserPlusIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import {useApplicant} from "../../features/applicant/useApplicant.ts";
import {useEffect, useMemo, useState, useCallback} from "react";
import {extractDepartments} from "../../utility/candidate-filter.utils.ts";
import {DEFAULT_FILTERS} from "../../constants/filter.constant.ts";
import type {Candidate} from "../../features/applicant/applicant.type.ts";
import {IFilterList} from "../../common/filterList/FilterList.type.ts";
import {FilterList} from "../../common/filterList/FilterList.tsx";
import {CandidateList} from "../../components/candidtateList/CandidateList.tsx";
import {CandidateDetail} from "../../components/candidateDetail/CandidateDetail.tsx";
import {CandidateDetailSkeleton} from "../../components/candidateDetail/CandidateDetailSkeleton.tsx";
import {APPLICANT_DATA_MOCK} from "../../data_mock/APPLICANT_DATA_MOCK.ts";

export const Dashboard = () => {
    const {t} = useTranslation();
    const {user} = useAuth();
    const {stats, candidates, pagination, getApplicantStats, getCandidates} = useApplicant();
    const [isStatsLoad, setIsStatsLoad] = useState<boolean>(false);
    const [isCandidatesLoad, setIsCandidatesLoad] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [filters, setFilters] = useState<IFilterList>(DEFAULT_FILTERS);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
    const [isDetailLoad, setIsDetailLoad] = useState<boolean>(false);

    // Caricamento iniziale
    useEffect(() => {
        (async () => {
            setIsStatsLoad(true);
            setIsCandidatesLoad(true);
            await getApplicantStats();
            setIsStatsLoad(false);
            await getCandidates(filters);
            setIsCandidatesLoad(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Quando cambiano i filtri → ricarica da pagina 1
    const handleFiltersChange = useCallback(async (newFilters: IFilterList) => {
        setFilters(newFilters);
        await getCandidates(newFilters, 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Scroll → carica pagina successiva
    const hasMore = pagination ? pagination.currentPage < pagination.totalPages : false;

    const handleLoadMore = useCallback(async () => {
        if (!pagination || isLoadingMore) return;
        setIsLoadingMore(true);
        await getCandidates(filters, pagination.currentPage + 1);
        setIsLoadingMore(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination, isLoadingMore, filters]);

    // Dipartimenti estratti da tutti i candidati mock (non filtrati)
    const departments = useMemo(() => extractDepartments(APPLICANT_DATA_MOCK), []);

    // Seleziona il primo candidato quando cambia la lista (filtri, caricamento iniziale)
    useEffect(() => {
        if (candidates.length > 0) {
            setSelectedCandidateId(candidates[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [candidates]);

    const selectedCandidate = useMemo(() => candidates.find(c => c.id === selectedCandidateId) ?? null, [candidates, selectedCandidateId]);

    // Simula caricamento dettaglio quando cambia la selezione
    useEffect(() => {
        if (!selectedCandidateId) return;
        setIsDetailLoad(true);
        // TODO: sostituire con chiamata API reale per il dettaglio candidato
        const timeout = setTimeout(() => setIsDetailLoad(false), 600);
        return () => clearTimeout(timeout);
    }, [selectedCandidateId]);

    const handleSelectCandidate = (candidate: Candidate) => {
        setSelectedCandidateId(candidate.id);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
                    {t('dashboard.title')}
                </h1>
                <p className="mt-1 text-sm text-text-muted">
                    {t('dashboard.welcome')}, {user?.first_name || 'Utente'}
                </p>
            </header>

            {/* Stat Cards */}
            <section aria-label={t('dashboard.stats_section', 'Statistiche principali')}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {isStatsLoad ? (
                        <StatCardSkeleton count={4}/>
                    ) : (
                        <>
                            <StatCard
                                label={t('dashboard.total_candidates')}
                                value={stats?.totalCandidates ?? '-'}
                                description={t('dashboard.total_candidates_desc')}
                                icon={UsersIcon}
                                variant="primary"
                            />
                            <StatCard
                                label={t('dashboard.under_review')}
                                value={stats?.underReview ?? '-'}
                                description={t('dashboard.under_review_desc')}
                                icon={FlagIcon}
                                variant="amber"
                            />
                            <StatCard
                                label={t('dashboard.hired')}
                                value={stats?.hired ?? '-'}
                                description={t('dashboard.hired_desc')}
                                icon={UserPlusIcon}
                                variant="emerald"
                            />
                            <StatCard
                                label={t('dashboard.avg_score')}
                                value={stats ? `${stats.avgScore}/100` : '-'}
                                description={t('dashboard.avg_score_desc')}
                                icon={StarIcon}
                                variant="indigo"
                            />
                        </>
                    )}
                </div>
            </section>

            {/* Candidate List + Detail */}
            <section aria-label={t('candidates.section_label', 'Gestione candidati')}>
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 items-start">
                    <div className="md:max-w-md lg:max-w-lg xl:max-w-none xl:col-span-5 min-w-0 space-y-4">
                        <FilterList
                            filters={filters}
                            departments={departments}
                            isLoading={isCandidatesLoad}
                            onFiltersChange={handleFiltersChange}
                        />
                        <CandidateList
                            candidates={candidates}
                            selectedId={selectedCandidate?.id ?? null}
                            totalCount={pagination?.totalItems}
                            isLoading={isCandidatesLoad}
                            isLoadingMore={isLoadingMore}
                            hasMore={hasMore}
                            onSelect={handleSelectCandidate}
                            onLoadMore={handleLoadMore}
                        />
                    </div>

                    {/* Colonna destra - Dettaglio candidato */}
                    <div className="xl:col-span-7 min-w-0">
                        {isDetailLoad || isCandidatesLoad ? (
                            <CandidateDetailSkeleton/>
                        ) : selectedCandidate && (
                            <CandidateDetail candidate={selectedCandidate}/>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
