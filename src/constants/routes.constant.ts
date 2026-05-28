import {Squares2X2Icon, Cog6ToothIcon} from "@heroicons/react/24/outline";
import {Login} from "../pages/login/Login.tsx";
import {RouteConfig} from "../types/routes.type.ts";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Settings from "../pages/settings/Settings.tsx";

export const APP_ROUTES: RouteConfig[] = [
    {path: '/login', component: Login, access: 'public'},
    {
        path: '/dashboard',
        component: Dashboard,
        access: 'protected',
        menu: {id: 'dashboard', name: 'Dashboard', icon: Squares2X2Icon},
    },
    {
        path: '/settings',
        component: Settings,
        access: 'protected',
        allowedRoles: ['admin'],
        menu: {id: 'settings', name: 'Impostazioni', icon: Cog6ToothIcon},
    },
];

export const MENU_ITEMS = APP_ROUTES.filter(r => r.menu);

