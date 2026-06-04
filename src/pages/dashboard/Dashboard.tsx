import {useTranslation} from "react-i18next";
import {useAuth} from "../../features/auth/useAuth.ts";
import {StatCard} from "../../common/stat-card/StatCard.tsx";
import {StatCardSkeleton} from "../../common/stat-card/StatCardSkeleton.tsx";
import {
    UsersIcon,
    FlagIcon,
    UserPlusIcon,
    StarIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';
import {useApplicant} from "../../features/applicant/useApplicant.ts";
import {useEffect, useMemo, useState, useCallback} from "react";
import {extractDepartments} from "../../utility/candidate-filter.utils.ts";
import {DEFAULT_FILTERS} from "../../constants/filter.constant.ts";
import type {Candidate, CandidateStatus} from "../../features/applicant/applicant.type.ts";
import {IFilterList} from "../../common/filterList/FilterList.type.ts";
import {FilterList} from "../../common/filterList/FilterList.tsx";
import {CandidateList} from "../../components/candidtateList/CandidateList.tsx";
import {CandidateDetail} from "../../components/candidateDetail/CandidateDetail.tsx";
import {CandidateDetailSkeleton} from "../../components/candidateDetail/CandidateDetailSkeleton.tsx";
import {ProfessionalDossier} from "../../components/professionalDossier/ProfessionalDossier.tsx";
import {ProfessionalDossierSkeleton} from "../../components/professionalDossier/ProfessionalDossierSkeleton.tsx";
import {StatusRecruitment} from "../../components/statusRecruitment/StatusRecruitment.tsx";
import {StatusRecruitmentSkeleton} from "../../components/statusRecruitment/StatusRecruitmentSkeleton.tsx";
import {ApplicationDate} from "../../components/applicationDate/ApplicationDate.tsx";
import {Notes} from "../../components/notes/Notes.tsx";
import {Timeline} from "../../components/timeline/Timeline.tsx";
import {JobPositionCard} from "../../components/jobPosition/JobPositionCard.tsx";
import {JobPositionCardSkeleton} from "../../components/jobPosition/JobPositionCardSkeleton.tsx";
import {NotesSkeleton} from "../../components/notes/NotesSkeleton.tsx";
import {ApplicationDateSkeleton} from "../../components/applicationDate/ApplicationDateSkeleton.tsx";
import {TimelineSkeleton} from "../../components/timeline/TimelineSkeleton.tsx";
import {APPLICANT_DATA_MOCK} from "../../data_mock/APPLICANT_DATA_MOCK.ts";
import {useApiSimulation} from "../../common/api-simulation/useApiSimulation.ts";
import {BoltIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';

export const Dashboard = () => {
    const {t} = useTranslation();
    const {user} = useAuth();
    const {simulateError, setSimulateError, simulateLatency, setSimulateLatency} = useApiSimulation();
    const {stats, candidates, selectedCandidate, pagination, getApplicantStats, getCandidates, getCandidateDetail, clearSelectedCandidate, changeCandidateStatus, addNote, deleteNote} = useApplicant();
    const [isStatsLoad, setIsStatsLoad] = useState<boolean>(false);
    const [isCandidatesLoad, setIsCandidatesLoad] = useState<boolean>(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [filters, setFilters] = useState<IFilterList>(DEFAULT_FILTERS);
    const [isDetailLoad, setIsDetailLoad] = useState<boolean>(false);

    // Dipartimenti estratti da tutti i candidati mock (non filtrati)
    const departments = useMemo(() => extractDepartments(APPLICANT_DATA_MOCK), []);
    // Seleziona il primo candidato quando cambia la lista (filtri, caricamento iniziale)
    const candidateIds = useMemo(() => candidates.map(c => c.id).join(','), [candidates]);
    // Scroll → carica pagina successiva
    const hasMore = pagination ? pagination.currentPage < pagination.totalPages : false;

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

    const handleLoadMore = useCallback(async () => {
        if (!pagination || isLoadingMore) return;
        setIsLoadingMore(true);
        await getCandidates(filters, pagination.currentPage + 1);
        setIsLoadingMore(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination, isLoadingMore, filters]);

    useEffect(() => {
        if (candidates.length > 0) {
            loadCandidateDetail(candidates[0].id);
        } else {
            clearSelectedCandidate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [candidateIds]);

    const loadCandidateDetail = async (candidateId: string) => {
        setIsDetailLoad(true);
        await getCandidateDetail(candidateId);
        setIsDetailLoad(false);
    };

    const handleSelectCandidate = (candidate: Candidate) => {
        loadCandidateDetail(candidate.id);
    };

    const authorName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
    const userRole = user?.role as 'admin' | 'viewer';

    const handleAddNote = (content: string) => {
        addNote(content, authorName, userRole);
    };

    const handleStatusChange = (status: CandidateStatus) => {
        changeCandidateStatus(status, authorName, userRole);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
                        {t('dashboard.title')}
                    </h1>
                    <p className="mt-1 text-sm text-text-muted">
                        {t('dashboard.welcome')}, {user?.first_name || 'Utente'}
                    </p>
                </div>

                {/* Dev Toolbar - Simulazione API */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setSimulateLatency(!simulateLatency)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer ${
                            simulateLatency
                                ? 'bg-amber-100 text-amber-700'
                                : 'text-slate-500 hover:bg-slate-50'
                        }`}
                        aria-label={t('dashboard.simulate_latency', 'Simula Latenza')}
                    >
                        <BoltIcon className="size-4" aria-hidden="true"/>
                        {t('dashboard.simulate_latency', 'Simula Latenza')}
                    </button>
                    <button
                        type="button"
                        onClick={() => setSimulateError(!simulateError)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer ${
                            simulateError
                                ? 'bg-red-100 text-red-700'
                                : 'text-slate-500 hover:bg-slate-50'
                        }`}
                        aria-label={t('dashboard.simulate_error', 'Simula Errore API')}
                    >
                        <ExclamationTriangleIcon className="size-4" aria-hidden="true"/>
                        {t('dashboard.simulate_error', 'Simula Errore API')}
                    </button>
                </div>
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
                                value={stats?.avgScore != null && !isNaN(stats.avgScore) ? `${stats.avgScore}/100` : '-'}
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
                    <div className="xl:col-span-5 min-w-0 space-y-4">
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
                    <div className="xl:col-span-7 min-w-0 space-y-6">
                        {isDetailLoad || isCandidatesLoad ? (
                            <>
                                <CandidateDetailSkeleton/>
                                <JobPositionCardSkeleton/>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                    <div className="lg:col-span-7 space-y-6">
                                        <ProfessionalDossierSkeleton/>
                                        <NotesSkeleton/>
                                    </div>
                                    <div className="lg:col-span-5 space-y-6">
                                        <StatusRecruitmentSkeleton/>
                                        <ApplicationDateSkeleton/>
                                        <TimelineSkeleton/>
                                    </div>
                                </div>
                            </>
                        ) : selectedCandidate ? (
                            <>
                                <CandidateDetail candidate={selectedCandidate}/>
                                {selectedCandidate.jobPosition && (
                                    <JobPositionCard
                                        role={selectedCandidate.role}
                                        department={selectedCandidate.department}
                                        jobPosition={selectedCandidate.jobPosition}
                                    />
                                )}
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                    <div className="lg:col-span-7 space-y-6">
                                        <ProfessionalDossier
                                            summary={selectedCandidate.summary}
                                            matchReason={selectedCandidate.matchReason}
                                            softSkills={selectedCandidate.softSkills}
                                        />
                                        <Notes
                                            notes={selectedCandidate.notes ?? []}
                                            isAdmin={user?.role === 'admin'}
                                            currentUserName={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()}
                                            onAddNote={handleAddNote}
                                            onDeleteNote={deleteNote}
                                        />
                                    </div>
                                    <div className="lg:col-span-5 space-y-6">
                                        <StatusRecruitment
                                            currentStatus={selectedCandidate.status}
                                            isAdmin={user?.role === 'admin'}
                                            onStatusChange={handleStatusChange}
                                        />
                                        <ApplicationDate date={selectedCandidate.appliedDate}/>
                                        <Timeline events={selectedCandidate.timeline ?? []}/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <article className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center py-24 px-6 text-center">
                                <BookOpenIcon className="size-14 text-slate-300 mb-4" aria-hidden="true"/>
                                <h2 className="text-lg font-semibold text-slate-700">
                                    {t('candidates.no_selection_title', 'Nessun candidato selezionato')}
                                </h2>
                                <p className="mt-2 text-sm text-slate-400 max-w-sm">
                                    {t('candidates.no_selection_desc', 'Seleziona un candidato dall\'elenco per visualizzare il suo dossier completo, lo storico e i dettagli delle valutazioni.')}
                                </p>
                            </article>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
