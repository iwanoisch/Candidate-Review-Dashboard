import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../features/auth/hooks/useAuth.ts";
import {Spinner} from "../../common/spinner/Spinner.tsx";
import type {UserRole} from "../../features/auth/slice/auth.type.ts";

interface RouteGuardProps {
    access: 'public' | 'protected';
    allowedRoles?: UserRole[];
}

export const RouteGuard = ({access, allowedRoles}: RouteGuardProps) => {
    const {isAuthenticated, isLoading, user} = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <Spinner size="lg" centered/>;
    }

    if (access === 'public') {
        return isAuthenticated ? <Navigate to="/dashboard" replace/> : <Outlet/>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location.pathname}} replace/>;
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role as UserRole)) {
        return <Navigate to="/dashboard" replace/>;
    }

    return <Outlet/>;
};
