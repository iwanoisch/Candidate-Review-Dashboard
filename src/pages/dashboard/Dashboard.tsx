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
import {useEffect, useMemo, useState} from "react";
import {filterCandidates, extractDepartments} from "../../utility/candidate-filter.utils.ts";
import {DEFAULT_FILTERS} from "../../constants/filter.constant.ts";
import type {Candidate} from "../../features/applicant/applicant.type.ts";
import {CandidateFilters} from "../../common/filterBar/FilterBar.type.ts";
import {FilterBar} from "../../common/filterBar/FilterBar.tsx";
import {CandidateList} from "../../components/candidtateList/CandidateList.tsx";

export const Dashboard = () => {
    const {t} = useTranslation();
    const {user} = useAuth();
    const {stats, candidates, selectedCandidate, getApplicantStats, getCandidates} = useApplicant();
    const [isStatsLoad, setIsStatsLoad] = useState<boolean>(false);
    const [isCandidatesLoad, setIsCandidatesLoad] = useState<boolean>(false);
    const [filters, setFilters] = useState<CandidateFilters>(DEFAULT_FILTERS);

    useEffect(() => {
        (async () => {
            setIsStatsLoad(true);
            setIsCandidatesLoad(true);
            // TODO: rimuovere il timeout, serve solo per visualizzare lo skeleton
            await new Promise(resolve => setTimeout(resolve, 2000));
            await getApplicantStats();
            setIsStatsLoad(false);
            await getCandidates();
            setIsCandidatesLoad(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const departments = useMemo(() => extractDepartments(candidates), [candidates]);
    const filteredCandidates = useMemo(() => filterCandidates(candidates, filters), [candidates, filters]);

    const handleSelectCandidate = (_candidate: Candidate) => {
        // TODO: dispatch selectCandidate e mostrare dettaglio nella colonna destra
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
                    {t('dashboard.title', 'Dashboard')}
                </h1>
                <p className="mt-1 text-sm text-text-muted">
                    {t('dashboard.welcome', 'Benvenuto')}, {user?.first_name || 'Utente'}
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
                                label={t('dashboard.total_candidates', 'Candidati Totali')}
                                value={stats?.totalCandidates ?? '-'}
                                description={t('dashboard.total_candidates_desc', 'Nel database attivo')}
                                icon={UsersIcon}
                                variant="primary"
                            />
                            <StatCard
                                label={t('dashboard.under_review', 'Sotto Valutazione')}
                                value={stats?.underReview ?? '-'}
                                description={t('dashboard.under_review_desc', 'Screening e colloqui')}
                                icon={FlagIcon}
                                variant="amber"
                            />
                            <StatCard
                                label={t('dashboard.hired', 'Candidati Assunti')}
                                value={stats?.hired ?? '-'}
                                description={t('dashboard.hired_desc', 'Risorse inserite in organico')}
                                icon={UserPlusIcon}
                                variant="emerald"
                            />
                            <StatCard
                                label={t('dashboard.avg_score', 'Punteggio Medio')}
                                value={stats ? `${stats.avgScore}/100` : '-'}
                                description={t('dashboard.avg_score_desc', 'Valutazione media screening')}
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
                        <FilterBar
                            filters={filters}
                            departments={departments}
                            isLoading={isCandidatesLoad}
                            onFiltersChange={setFilters}
                        />
                        <CandidateList
                            candidates={filteredCandidates}
                            selectedId={selectedCandidate?.id ?? null}
                            isLoading={isCandidatesLoad}
                            onSelect={handleSelectCandidate}
                        />
                    </div>

                    {/* TODO: Colonna destra - Dettaglio candidato (xl:col-span-7) */}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
