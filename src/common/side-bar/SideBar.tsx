import {useMemo, useState} from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {NavLink, useNavigate} from 'react-router-dom';
import {MENU_ITEMS} from '../../constants/routes.constant';
import {useAuth} from '../../features/auth/hooks/useAuth';
import LanguageSelector from '../language-selector/LanguageSelector';
import {useTranslation} from "react-i18next";
import {SideBarProps} from "./Sidebar.type.ts";
import type {UserRole} from "../../features/auth/slice/auth.type.ts";

export const SideBar = ({showFullSidebar = true, isCollapsed, onToggle}: SideBarProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const visibleMenuItems = useMemo(() => {
        const role = user?.role as UserRole | undefined;
        return MENU_ITEMS.filter(route => !route.allowedRoles || (role && route.allowedRoles.includes(role)));
    }, [user?.role]);

    const handleLogout = () => {
        logout();
        navigate('/', {replace: true});
    };

    return (
        <>
            {showFullSidebar && (
                <>
                    {/* MOBILE: sidebar in Dialog */}
                    <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                        <DialogBackdrop className="fixed inset-0 bg-slate-900/80"/>

                        <div className="fixed inset-0 flex">
                            <DialogPanel className="relative flex w-full max-w-xs flex-1">
                                <div className="flex grow flex-col overflow-y-auto bg-white border-r border-slate-200 px-4 pb-4">
                                    <div className="flex h-16 items-center justify-between border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                                                CRD
                                            </div>
                                            <span className="text-lg font-bold text-slate-900">Candidate Review</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSidebarOpen(false)}
                                            className="p-2 text-slate-400 hover:text-slate-600"
                                        >
                                            <XMarkIcon className="size-5"/>
                                        </button>
                                    </div>

                                    <nav className="flex flex-1 flex-col mt-6">
                                        {user && (
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="space-y-1">
                                                        {visibleMenuItems.map((route) => (
                                                                <li key={route.menu!.id}>
                                                                    <NavLink
                                                                        to={route.path}
                                                                        onClick={() => setSidebarOpen(false)}
                                                                        className={({isActive}) =>
                                                                            `${isActive
                                                                                ? 'bg-primary-50 text-primary-600'
                                                                                : 'text-slate-700 hover:bg-slate-50 hover:text-primary-600'
                                                                            } group flex rounded-md text-sm font-semibold items-center transition-all duration-300 gap-3 px-4 py-2.5`
                                                                        }
                                                                    >
                                                                        {({isActive}) => {
                                                                            const Icon = route.menu!.icon;
                                                                            return (
                                                                                <>
                                                                                    {Icon && (
                                                                                        <Icon
                                                                                            className={`size-6 shrink-0 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-600'}`}
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                    )}
                                                                                    <span>{t(`sidebar.${route.menu!.id}`, route.menu!.name)}</span>
                                                                                </>
                                                                            );
                                                                        }}
                                                                    </NavLink>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </li>

                                                {/* User info + logout */}
                                                <li className="mt-auto pt-4">
                                                    <div
                                                        className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="min-w-0">
                                                                <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">
                                                                    {user?.role === 'admin' ? 'Admin' : 'Viewer'}
                                                                </p>
                                                                <p className="font-bold text-sm text-slate-700 truncate">
                                                                    {user?.first_name} {user?.last_name}
                                                                </p>
                                                            </div>
                                                            <button
                                                                className="p-2 text-slate-400 hover:text-primary-600 transition-colors shrink-0"
                                                                title={t('sidebar.logout', 'Logout')}
                                                                onClick={handleLogout}
                                                            >
                                                                <ArrowLeftStartOnRectangleIcon className="size-6"/>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <LanguageSelector id="language-mobile"/>
                                                    </div>
                                                </li>

                                                <li className="pb-4">
                                                    <div
                                                        className="border-t border-slate-100 pt-3 p-2 text-xs text-slate-400">
                                                        <p className="font-medium text-slate-500">{t('app.name', 'CRD')}</p>
                                                        <p>{t('app.version', 'Versione')} {__APP_VERSION__}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        )}
                                    </nav>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    {/* DESKTOP: sidebar fissa con collapse */}
                    <div
                        className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
                        <button
                            type="button"
                            onClick={onToggle}
                            className="absolute -right-3 top-40 z-10 flex size-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm hover:bg-slate-50 hover:text-slate-600"
                            aria-label={isCollapsed ? "Espandi sidebar" : "Riduci sidebar"}
                        >
                            {isCollapsed ? (
                                <ChevronRightIcon className="size-4"/>
                            ) : (
                                <ChevronLeftIcon className="size-4"/>
                            )}
                        </button>

                        <div
                            className={`relative flex grow flex-col overflow-y-auto overflow-x-hidden bg-white border-r border-slate-200 transition-[padding] duration-300 ease-out ${isCollapsed ? 'px-2' : 'px-3'}`}>
                            {/* Logo */}
                            <div
                                onClick={() => navigate('/dashboard')}
                                className={`relative flex shrink-0 items-center cursor-pointer transition-all duration-300 ease-out h-16 border-b border-slate-100 hover:bg-slate-50 ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                                        CRD
                                    </div>
                                    <span
                                        className={`text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap transition-all duration-300 ease-out overflow-hidden ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-48'}`}>
                                        Candidate Review
                                    </span>
                                </div>
                            </div>

                            <nav className="flex flex-1 flex-col mt-5">
                                {user && (
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="space-y-1">
                                                {visibleMenuItems.map((route) => {
                                                    const Icon = route.menu!.icon;
                                                    return (
                                                        <li key={route.menu!.id}>
                                                            <NavLink
                                                                to={route.path}
                                                                title={isCollapsed ? route.menu!.name : undefined}
                                                                className={({isActive}) =>
                                                                    `${isActive
                                                                        ? 'bg-primary-50 text-primary-600'
                                                                        : 'text-slate-700 hover:bg-slate-50 hover:text-primary-600'
                                                                    } group flex rounded-md text-sm font-semibold items-center transition-all duration-300 py-2 ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'}`
                                                                }
                                                            >
                                                                {({isActive}) => (
                                                                    <>
                                                                        {Icon && (
                                                                            <Icon
                                                                                className={`size-6 shrink-0 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-600'}`}
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                        <span
                                                                            className={`whitespace-nowrap transition-all duration-300 ease-out overflow-hidden ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-48'}`}>
                                                                            {t(`sidebar.${route.menu!.id}`, route.menu!.name)}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </NavLink>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>

                                        {/* User info + logout */}
                                        <li className="mt-auto pt-4">
                                            <div
                                                className={`rounded-xl bg-slate-50 border border-slate-200 relative group overflow-hidden transition-all duration-300 ease-out ${isCollapsed ? 'p-2' : 'p-4'}`}>
                                                <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                                                    <div
                                                        className={`min-w-0 transition-all duration-300 ease-out overflow-hidden ${isCollapsed ? 'opacity-0 max-w-0 hidden' : 'opacity-100 max-w-48'}`}>
                                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">
                                                            {user?.role === 'admin' ? 'Admin' : 'Viewer'}
                                                        </p>
                                                        <p className="font-bold text-sm text-slate-700 truncate">
                                                            {user?.first_name} {user?.last_name}
                                                        </p>
                                                    </div>
                                                    <button
                                                        className="p-2 text-slate-400 hover:text-primary-600 transition-colors shrink-0"
                                                        title={t('sidebar.logout', 'Logout')}
                                                        onClick={handleLogout}
                                                    >
                                                        <ArrowLeftStartOnRectangleIcon className="size-6"/>
                                                    </button>
                                                </div>
                                            </div>

                                            <div
                                                className={`relative transition-all duration-300 ease-out overflow-hidden ${isCollapsed ? 'opacity-0 max-h-0' : 'opacity-100 max-h-16 mt-3'}`}>
                                                <LanguageSelector id="language-desktop"/>
                                            </div>
                                        </li>

                                        {/* Version */}
                                        <li className="pb-4">
                                            <div
                                                className="border-t border-slate-100 pt-3 p-2 text-xs text-slate-400">
                                                <div
                                                    className={`flex justify-center transition-all duration-300 ease-out overflow-hidden ${isCollapsed ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'}`}>
                                                    <span title={`Versione ${__APP_VERSION__}`}
                                                          className="text-[10px] font-bold text-slate-400">
                                                        V{__APP_VERSION__}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`transition-all duration-300 ease-out overflow-hidden ${isCollapsed ? 'opacity-0 max-h-0' : 'opacity-100 max-h-20'}`}>
                                                    <p className="font-medium text-slate-500">{t('app.name', 'CRD')}</p>
                                                    <p>{t('app.version', 'Versione')} {__APP_VERSION__}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                )}
                            </nav>
                        </div>
                    </div>
                </>
            )}

            {/* MOBILE HEADER */}
            <header className="sticky top-0 z-40 bg-white shadow-sm lg:hidden">
                <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                            CRD
                        </div>
                        <span className="font-bold text-slate-900">Candidate Review</span>
                    </div>
                    {showFullSidebar && (
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-slate-700"
                        >
                            <Bars3Icon className="size-6"/>
                        </button>
                    )}
                </div>
            </header>
        </>
    );
};
