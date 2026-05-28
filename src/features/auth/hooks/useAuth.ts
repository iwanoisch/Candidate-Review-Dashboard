import {persistor, useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {loginFailure, loginStart, loginSuccess, logout, restoreAuth} from "../slice/authSlice.ts";
import {useAlert} from "../../../common/alert/useAlert.ts";
import {useTheme} from "../../../hooks/theme/useTheme";
import {useLanguage} from "../../../hooks/language/useLanguage";
import {MOCK_USERS} from "../../../data_mock/AUTH_DATA_MOCK.ts";
import {User} from "../slice/auth.type.ts";

export const useAuth = () => {
    const {showAlert} = useAlert();
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const {resetTheme, loadUserTheme} = useTheme();
    const {resetLanguage, loadUserLanguage} = useLanguage();

    const login = async (email: string, password: string) => {
        dispatch(loginStart());
        try {
            const found = MOCK_USERS.find(
                (u) => u.email === email && u.password === password
            );

            if (!found) {
                dispatch(loginFailure('Credenziali non valide'));
                return {success: false, error: 'Credenziali non valide'};
            }

            const {user, token} = found;

            // redux-persist salva automaticamente lo state auth in localStorage
            dispatch(loginSuccess({user, token}));

            loadUserTheme(Number(user.id));
            loadUserLanguage(Number(user.id));

            return {success: true};
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Errore sconosciuto';
            dispatch(loginFailure(message));
            return {success: false, error: message};
        }
    };

    const logoutUser = async () => {
        try {
            dispatch(logout());
            await persistor.purge();
            await persistor.flush();

            resetTheme();
            resetLanguage();
        } catch (error) {
            showAlert({
                title: 'Error',
                type: "error",
                message: (error as unknown as { message: string }).message,
            });
        }
    };

    const checkAuth = async () => {
        // redux-persist reidrata lo state automaticamente al boot.
        // Qui basta verificare che token e user esistano nello state gia' reidratato.
        if (!authState.token || !authState.user) return false;

        // Se lo state e' reidratato ma isAuthenticated e' false (es. dopo purge parziale),
        // ripristiniamo lo stato
        if (!authState.isAuthenticated) {
            dispatch(restoreAuth({
                user: authState.user as User,
                token: authState.token,
            }));
        }
        return true;
    };

    const updateUser = async (updatedFields: Partial<User>) => {
        dispatch(loginStart());
        try {
            const token = authState.token;
            if (!token) return null;

            const updatedUser = {...authState.user, ...updatedFields} as User;

            // redux-persist persiste automaticamente il nuovo state
            dispatch(restoreAuth({user: updatedUser, token}));
            return updatedUser;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Errore sconosciuto';
            dispatch(loginFailure(message));
            return null;
        }
    };

    return {
        ...authState,
        isLoading: authState.isLoading,
        login,
        logout: logoutUser,
        updateUser,
        checkAuth,
    };
};
