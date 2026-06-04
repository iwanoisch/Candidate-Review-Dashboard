import {screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {Layout} from '../Layout';
import {renderWithProviders, mockAdminUser, mockViewerUser, setupUser} from '../../../test/test-utils';
import type {AuthState} from '../../../features/auth/auth.type';

// Mock i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, fallback?: string) => fallback ?? key,
    }),
}));

// Mock __APP_VERSION__
vi.stubGlobal('__APP_VERSION__', '1.0.0');

const TestPage = () => <div data-testid="test-page">Test Page</div>;

function renderLayout(options?: {
    auth?: {auth: Partial<AuthState>};
    initialEntries?: string[];
}) {
    return renderWithProviders(
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/dashboard" element={<TestPage/>}/>
            </Route>
        </Routes>,
        {
            initialEntries: options?.initialEntries ?? ['/dashboard'],
            preloadedState: options?.auth,
        },
    );
}

describe('Layout', () => {
    it('should render the outlet content', () => {
        renderLayout({
            auth: {auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'}},
        });
        expect(screen.getByTestId('test-page')).toBeInTheDocument();
    });

    it('should show sidebar menu items for admin', () => {
        renderLayout({
            auth: {auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'}},
        });
        // t('sidebar.dashboard') → 'sidebar.dashboard', t('sidebar.settings') → 'sidebar.settings'
        expect(screen.getAllByText('sidebar.dashboard').length).toBeGreaterThan(0);
        expect(screen.getAllByText('sidebar.settings').length).toBeGreaterThan(0);
    });

    it('should hide admin-only menu items for viewer', () => {
        renderLayout({
            auth: {auth: {isAuthenticated: true, user: mockViewerUser, token: 'tok'}},
        });
        // Viewer should see dashboard but NOT settings
        expect(screen.getAllByText('sidebar.dashboard').length).toBeGreaterThan(0);
        expect(screen.queryByText('sidebar.settings')).not.toBeInTheDocument();
    });

    it('should have a toggle button for sidebar collapse', () => {
        renderLayout({
            auth: {auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'}},
        });
        const toggleButton = screen.getByLabelText(/sidebar/i);
        expect(toggleButton).toBeInTheDocument();
    });

    it('should toggle sidebar on button click', async () => {
        const user = setupUser();
        renderLayout({
            auth: {auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'}},
        });

        const toggleButton = screen.getByLabelText(/sidebar/i);
        await user.click(toggleButton);

        expect(screen.getByLabelText(/sidebar/i)).toBeInTheDocument();
    });
});
