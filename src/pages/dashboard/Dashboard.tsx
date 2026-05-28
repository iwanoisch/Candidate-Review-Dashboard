import {useTranslation} from "react-i18next";
import {useAuth} from "../../features/auth/hooks/useAuth.ts";
import {ThemeSelector} from "../../common/theme-selector/ThemeSelector.tsx";
import {useAlert} from "../../common/alert/useAlert.ts";

export const Dashboard = () => {
    const {t} = useTranslation();
    const {user} = useAuth();
    const {showAlert} = useAlert();

    return (
        <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    {t('dashboard.title', 'Dashboard')}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    {t('dashboard.welcome', 'Benvenuto')}, {user?.first_name || 'Utente'}
                </p>
            </div>

            {/* Example cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <div className="card">
                    <h3 className="text-sm font-medium text-slate-500">{t('dashboard.card1', 'Card 1')}</h3>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">0</p>
                </div>
                <div className="card">
                    <h3 className="text-sm font-medium text-slate-500">{t('dashboard.card2', 'Card 2')}</h3>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">0</p>
                </div>
                <div className="card">
                    <h3 className="text-sm font-medium text-slate-500">{t('dashboard.card3', 'Card 3')}</h3>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">0</p>
                </div>
            </div>

            {/* Alert test */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    {t('dashboard.test_alerts', 'Test Alert System')}
                </h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => showAlert({type: 'success', message: 'Operazione completata!', duration: 3000})}
                        className="btn btn-primary"
                    >
                        Success Alert
                    </button>
                    <button
                        onClick={() => showAlert({type: 'error', message: 'Si è verificato un errore', duration: 3000})}
                        className="btn bg-red-500 text-white"
                    >
                        Error Alert
                    </button>
                    <button
                        onClick={() => showAlert({type: 'warning', message: 'Attenzione!', duration: 3000})}
                        className="btn bg-yellow-500 text-white"
                    >
                        Warning Alert
                    </button>
                    <button
                        onClick={() => showAlert({type: 'info', message: 'Informazione utile', duration: 3000})}
                        className="btn bg-blue-500 text-white"
                    >
                        Info Alert
                    </button>
                </div>
            </div>

            {/* Theme Selector */}
            <div className="card">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    {t('settings.theme_section', 'Tema colore')}
                </h2>
                <ThemeSelector/>
            </div>
        </div>
    );
};

export default Dashboard;
