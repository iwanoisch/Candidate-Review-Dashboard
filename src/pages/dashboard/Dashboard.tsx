import {useTranslation} from "react-i18next";
import {useAuth} from "../../features/auth/hooks/useAuth.ts";
import {StatCard} from "../../common/stat-card/StatCard.tsx";
import {
    UsersIcon,
    FlagIcon,
    UserPlusIcon,
    StarIcon,
} from '@heroicons/react/24/outline';

export const Dashboard = () => {
    const {t} = useTranslation();
    const {user} = useAuth();

    return (
        <div className="space-y-8">
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label={t('dashboard.total_candidates', 'Candidati Totali')}
                        value={7}
                        description={t('dashboard.total_candidates_desc', 'Nel database attivo')}
                        icon={UsersIcon}
                        variant="primary"
                    />
                    <StatCard
                        label={t('dashboard.under_review', 'Sotto Valutazione')}
                        value={3}
                        description={t('dashboard.under_review_desc', 'Screening e colloqui')}
                        icon={FlagIcon}
                        variant="amber"
                    />
                    <StatCard
                        label={t('dashboard.hired', 'Candidati Assunti')}
                        value={1}
                        description={t('dashboard.hired_desc', 'Risorse inserite in organico')}
                        icon={UserPlusIcon}
                        variant="emerald"
                    />
                    <StatCard
                        label={t('dashboard.avg_score', 'Punteggio Medio')}
                        value="86/100"
                        description={t('dashboard.avg_score_desc', 'Valutazione media screening')}
                        icon={StarIcon}
                        variant="indigo"
                    />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
