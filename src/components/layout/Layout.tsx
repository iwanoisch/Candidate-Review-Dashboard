import {Outlet} from "react-router-dom";
import {useAuth} from "../../features/auth/hooks/useAuth.ts";
import {useState, useCallback} from "react";
import {SideBar} from "../../common/side-bar/SideBar.tsx";
import {SIDEBAR_STORAGE_KEY} from "../../constants/layout.constant";

export const Layout = () => {
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

    const {isAuthenticated} = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-primary-100/30 to-slate-50">
            <SideBar showFullSidebar={isAuthenticated} isCollapsed={isCollapsed} onToggle={toggleSidebar}/>
            <main
                className={`min-h-screen transition-all duration-300 ease-in-out ${isAuthenticated ? (isCollapsed ? 'lg:pl-20' : 'lg:pl-64') : ''}`}>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        <Outlet/>
                    </div>
                </div>
            </main>
        </div>
    );
};
