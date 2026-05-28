import {createBrowserRouter, Navigate} from "react-router-dom";
import {Suspense} from "react";
import {Layout} from "../components/layout/Layout.tsx";
import {RouteGuard} from "../components/auth/RouteGuard.tsx";
import {ScrollToTop} from "../components/scroll-to-top/ScrollToTop.tsx";
import {Spinner} from "../common/spinner/Spinner.tsx";
import {APP_ROUTES} from "../constants/routes.constant.ts";
import type {RouteConfig} from "../types/routes.type.ts";
import NotFound from "../pages/not-found/NotFound.tsx";

const withSuspense = (route: RouteConfig) => ({
    path: route.path,
    element: (
        <Suspense fallback={<Spinner size="lg" centered/>}>
            <route.component/>
        </Suspense>
    ),
});

const buildRouteGroup = (routes: RouteConfig[], access: 'public' | 'protected') => ({
    element: <RouteGuard access={access} allowedRoles={routes[0].allowedRoles}/>,
    children: routes.map(withSuspense),
});

const buildRouteChildren = () => {
    const publicRoutes = APP_ROUTES.filter(r => r.access === 'public');
    const openProtected = APP_ROUTES.filter(r => r.access === 'protected' && !r.allowedRoles);
    const roleProtected = APP_ROUTES.filter(r => r.access === 'protected' && r.allowedRoles);

    // Raggruppa le role routes per combinazione di ruoli
    const roleGroups = Object.values(
        roleProtected.reduce<Record<string, RouteConfig[]>>((acc, route) => {
            const key = route.allowedRoles!.sort().join(',');
            (acc[key] ??= []).push(route);
            return acc;
        }, {})
    );

    return [
        {path: '/', element: <Navigate to="/dashboard" replace/>},
        buildRouteGroup(publicRoutes, 'public'),
        buildRouteGroup(openProtected, 'protected'),
        ...roleGroups.map(routes => buildRouteGroup(routes, 'protected')),
        {
            path: '*',
            element: (
                <Suspense fallback={<Spinner size="lg" centered/>}>
                    <NotFound/>
                </Suspense>
            ),
        },
    ];
};

export const router = createBrowserRouter([
    {
        element: <><ScrollToTop/><Layout/></>,
        children: buildRouteChildren(),
    },
]);
