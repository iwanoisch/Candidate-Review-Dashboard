import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const NotFound = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12">
            <h1 className="text-6xl font-bold text-primary-500">404</h1>
            <p className="mt-4 text-lg text-slate-600">
                {t('not_found.message')}
            </p>
            <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary mt-6"
            >
                {t('not_found.go_home')}
            </button>
        </div>
    );
};

export default NotFound;
