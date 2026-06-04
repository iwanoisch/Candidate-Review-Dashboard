import {screen, waitFor} from '@testing-library/react';
import {Login} from '../Login';
import {renderWithProviders, setupUser} from '../../../test/test-utils';

// Mock i18next — ritorna il fallback se presente, altrimenti la chiave
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('Login', () => {
    it('should render the login form', () => {
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /login\.submit/i})).toBeInTheDocument();
    });

    it('should update email and password fields', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'admin');
        await user.type(passwordInput, 'admin');

        expect(emailInput).toHaveValue('admin');
        expect(passwordInput).toHaveValue('admin');
    });

    it('should show error with both credentials wrong', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        await user.type(screen.getByLabelText(/email/i), 'wrong');
        await user.type(screen.getByLabelText(/password/i), 'wrong');
        await user.click(screen.getByRole('button', {name: /login\.submit/i}));

        await waitFor(() => {
            expect(screen.getByText(/credenziali non valide/i)).toBeInTheDocument();
        });
    });

    it('should show error with correct email but wrong password', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        await user.type(screen.getByLabelText(/email/i), 'admin');
        await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
        await user.click(screen.getByRole('button', {name: /login\.submit/i}));

        await waitFor(() => {
            expect(screen.getByText(/credenziali non valide/i)).toBeInTheDocument();
        });
        expect(screen.getByRole('button', {name: /login\.submit/i})).not.toBeDisabled();
    });

    it('should show error with wrong email but correct password', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        await user.type(screen.getByLabelText(/email/i), 'wrongemail');
        await user.type(screen.getByLabelText(/password/i), 'admin');
        await user.click(screen.getByRole('button', {name: /login\.submit/i}));

        await waitFor(() => {
            expect(screen.getByText(/credenziali non valide/i)).toBeInTheDocument();
        });
        expect(screen.getByRole('button', {name: /login\.submit/i})).not.toBeDisabled();
    });

    it('should not submit when email field is empty (HTML required)', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        await user.type(screen.getByLabelText(/password/i), 'admin');
        await user.click(screen.getByRole('button', {name: /login\.submit/i}));

        expect(screen.queryByText(/credenziali non valide/i)).not.toBeInTheDocument();
    });

    it('should not submit when password field is empty (HTML required)', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        await user.type(screen.getByLabelText(/email/i), 'admin');
        await user.click(screen.getByRole('button', {name: /login\.submit/i}));

        expect(screen.queryByText(/credenziali non valide/i)).not.toBeInTheDocument();
    });

    it('should login successfully with admin credentials', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        await user.type(screen.getByLabelText(/email/i), 'admin');
        await user.type(screen.getByLabelText(/password/i), 'admin');
        await user.click(screen.getByRole('button', {name: /login\.submit/i}));

        await waitFor(() => {
            expect(screen.getByRole('button', {name: /login\.submit/i})).toBeDisabled();
        });
    });

    it('should login successfully with viewer credentials', async () => {
        const user = setupUser();
        renderWithProviders(<Login/>, {initialEntries: ['/login']});

        await user.type(screen.getByLabelText(/email/i), 'viewer');
        await user.type(screen.getByLabelText(/password/i), 'viewer');
        await user.click(screen.getByRole('button', {name: /login\.submit/i}));

        await waitFor(() => {
            expect(screen.getByRole('button', {name: /login\.submit/i})).toBeDisabled();
        });
    });

    it('should show session expired message when present in location state', () => {
        renderWithProviders(<Login/>, {
            initialEntries: [{
                pathname: '/login',
                state: {message: 'session_expired'},
            }],
        });

        expect(screen.getByText(/login\.session_expired/i)).toBeInTheDocument();
    });

    it('should disable submit button when already authenticated', () => {
        renderWithProviders(<Login/>, {
            initialEntries: ['/login'],
            preloadedState: {
                auth: {isAuthenticated: true, user: {id: '1', role: 'admin'}, token: 'tok'},
            },
        });

        expect(screen.getByRole('button', {name: /login\.submit/i})).toBeDisabled();
    });
});
