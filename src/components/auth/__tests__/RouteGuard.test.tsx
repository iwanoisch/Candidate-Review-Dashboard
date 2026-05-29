import {screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {RouteGuard} from '../RouteGuard';
import {renderWithProviders, mockAdminUser, mockViewerUser} from '../../../test/test-utils';
import type {AuthState} from '../../../features/auth/slice/auth.type';

const TestChild = () => <div data-testid="child-content">Protected Content</div>;
const LoginPage = () => <div data-testid="login-page">Login Page</div>;
const DashboardPage = () => <div data-testid="dashboard-page">Dashboard</div>;

function renderRouteGuard(options: {
    access: 'public' | 'protected';
    allowedRoles?: ('admin' | 'viewer')[];
    initialEntries?: string[];
    auth?: Partial<AuthState>;
}) {
    const {access, allowedRoles, initialEntries = ['/test'], auth} = options;

    return renderWithProviders(
        <Routes>
            <Route element={<RouteGuard access={access} allowedRoles={allowedRoles}/>}>
                <Route path="/test" element={<TestChild/>}/>
            </Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>,
        {initialEntries, preloadedState: auth ? {auth} : undefined},
    );
}

describe('RouteGuard', () => {
    describe('public routes', () => {
        it('should show content when user is NOT authenticated', () => {
            renderRouteGuard({access: 'public'});
            expect(screen.getByTestId('child-content')).toBeInTheDocument();
        });

        it('should redirect to /dashboard when user IS authenticated', () => {
            renderRouteGuard({
                access: 'public',
                auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'},
            });
            expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
        });
    });

    describe('protected routes', () => {
        it('should redirect to /login when user is NOT authenticated', () => {
            renderRouteGuard({access: 'protected'});
            expect(screen.getByTestId('login-page')).toBeInTheDocument();
        });

        it('should show content when user IS authenticated', () => {
            renderRouteGuard({
                access: 'protected',
                auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'},
            });
            expect(screen.getByTestId('child-content')).toBeInTheDocument();
        });

        it('should show content when user has the required role', () => {
            renderRouteGuard({
                access: 'protected',
                allowedRoles: ['admin'],
                auth: {isAuthenticated: true, user: mockAdminUser, token: 'tok'},
            });
            expect(screen.getByTestId('child-content')).toBeInTheDocument();
        });

        it('should redirect to /dashboard when user does NOT have the required role', () => {
            renderRouteGuard({
                access: 'protected',
                allowedRoles: ['admin'],
                auth: {isAuthenticated: true, user: mockViewerUser, token: 'tok'},
            });
            expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
        });

        it('should show spinner when loading', () => {
            renderRouteGuard({
                access: 'protected',
                auth: {isAuthenticated: false, isLoading: true},
            });
            expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
            expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
        });
    });
});
