import {LayoutPagePros} from "./layout.type.ts"
import {useAuth} from "../../features/auth/hooks/useAuth.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState, useCallback} from "react";
import {Spinner} from "../../common/spinner/Spinner.tsx";
import {SideBar} from "../../common/side-bar/SideBar.tsx";
import {SIDEBAR_STORAGE_KEY} from "../../constants/layout.constant";

export const Layout = ({children}: LayoutPagePros) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
        return stored === "true";
    });

    const toggleSidebar = useCallback(() => {
        setIsCollapsed(prev => {
            const newValue = !prev;
            localStorage.setItem(SIDEBAR_STORAGE_KEY, String(newValue));
            return newValue;
        });
    }, []);

    const {isAuthenticated, checkAuth, isLoading} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const publicPaths = ['/login'];
    const excludePath = ['/login'];

    useEffect(() => {
        const verifyAuth = async () => {
            // Route pubbliche: non serve auth
            if (publicPaths.includes(location.pathname)) {
                return;
            }

            // Se gia' autenticato, redirect "/" -> "/dashboard"
            if (isAuthenticated) {
                if (location.pathname === "/") {
                    navigate("/dashboard", {replace: true});
                }
                return;
            }

            // Non autenticato: prova a recuperare sessione
            const isAuth = await checkAuth();
            if (isAuth) {
                if (location.pathname === "/") {
                    navigate("/dashboard", {replace: true});
                }
            } else {
                // Non autenticato: vai alla login
                navigate("/login", {replace: true});
            }
        };

        void verifyAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, isAuthenticated, checkAuth, navigate]);

    if (excludePath.includes(location.pathname)) return <div>{children}</div>;

    if (isLoading) {
        return <Spinner size="xl" centered/>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-primary-100/30 to-slate-50">
            <SideBar showFullSidebar={isAuthenticated} isCollapsed={isCollapsed} onToggle={toggleSidebar}/>
            <main className={`min-h-screen transition-all duration-300 ease-in-out ${isAuthenticated ? (isCollapsed ? 'lg:pl-20' : 'lg:pl-64') : ''}`}>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
