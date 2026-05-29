import {FormEvent, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {useAuth} from "../../features/auth/useAuth.ts";
import {useAlert} from "../../common/alert/useAlert.ts";
import {useTranslation} from "react-i18next";

export const Login = () => {
    const {showAlert} = useAlert();
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {login, isLoading, isAuthenticated} = useAuth();
    const location = useLocation();

    const redirectPath = searchParams.get('from');
    const sessionExpiredMessage = location.state?.message;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        const {success, error} = await login(email, password);

        if (success) {
            navigate(redirectPath || '/dashboard');
        } else {
            setError(error || t('login.invalid_credentials', 'Credenziali non valide'));
            showAlert({
                title: 'Error',
                type: "error",
                message: error as string,
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-page p-4">
            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <div
                        className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-primary-500 text-2xl font-bold text-white shadow-xl">
                        CRD
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                        {t('login.title', 'Accedi a CRD')}
                    </h1>
                    <p className="mt-2 text-text-muted">
                        {t('login.subtitle', 'Candidate Review Dashboard')}
                    </p>
                </div>

                <div className="card border-none p-8 shadow-xl">
                    {sessionExpiredMessage === 'session_expired' && (
                        <div className="mb-6 rounded-xl bg-error-light p-4">
                            <p className="text-sm text-error">
                                {t('login.session_expired', 'La tua sessione è scaduta. Per favore, effettua nuovamente l\'accesso.')}
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-xl bg-error-light p-4">
                            <p className="text-sm text-error">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email"
                                   className="mb-2 block text-sm font-medium text-text-secondary">
                                Email / Username
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input w-full"
                                placeholder="admin"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label htmlFor="password"
                                   className="mb-2 block text-sm font-medium text-text-secondary">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input w-full"
                                placeholder="admin"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || isAuthenticated}
                            className="btn btn-primary w-full py-3 text-lg font-bold"
                        >
                            {isLoading ? t('login.loading', 'Accesso in corso...') : t('login.submit', 'Accedi')}
                        </button>
                    </form>

                    {!isLoading && isAuthenticated && (
                        <div className="mt-6 text-center">
                            <p className="text-sm text-text-muted">
                                {t('login.already_authenticated', 'Sei già autenticato nel sistema.')}{' '}
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/dashboard');
                                    }}
                                    className="font-semibold text-primary-600 hover:underline"
                                >
                                    {t('login.go_to_dashboard', 'Vai alla Dashboard')} →
                                </a>
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-center text-xs text-text-muted">
                    <p>Demo: <strong>admin</strong> / <strong>admin</strong> oppure <strong>viewer</strong> / <strong>viewer</strong></p>
                </div>
            </div>
        </div>
    );
};
