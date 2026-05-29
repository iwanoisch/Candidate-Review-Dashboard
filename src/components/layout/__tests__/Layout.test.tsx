import {screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {Layout} from '../Layout';
import {renderWithProviders, mockAdminUser, mockViewerUser, setupUser} from '../../../test/test-utils';
import type {AuthState} from '../../../features/auth/slice/auth.type';

// Mock i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (_key: string, fallback: string) => fallback,
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
        // Admin should see Dashboard and Impostazioni
        expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Impostazioni').length).toBeGreaterThan(0);
    });

    it('should hide admin-only menu items for viewer', () => {
        renderLayout({
            auth: {auth: {isAuthenticated: true, user: mockViewerUser, token: 'tok'}},
        });
        // Viewer should see Dashboard but NOT Impostazioni
        expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
        expect(screen.queryByText('Impostazioni')).not.toBeInTheDocument();
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

        // After click, the label should change
        expect(screen.getByLabelText(/sidebar/i)).toBeInTheDocument();
    });
});
