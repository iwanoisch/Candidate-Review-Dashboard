import {RootState, useAppDispatch} from "./store/store.ts";
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout.tsx";
import {start} from "./features/init/slice/initSlice.ts";
import {lazy, Suspense, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Spinner} from "./common/spinner/Spinner.tsx";

// Import immediati per le pagine iniziali
import {Login} from "./pages/login/Login.tsx";
import {ScrollToTop} from "./components/scroll-to-top/ScrollToTop.tsx";

// Lazy loading per le altre pagine
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.tsx").then(m => ({default: m.Dashboard})));
const Settings = lazy(() => import("./pages/settings/Settings.tsx").then(m => ({default: m.Settings})));
const NotFound = lazy(() => import("./pages/not-found/NotFound.tsx").then(m => ({default: m.NotFound})));

function AppRouting() {
    const init = useSelector((state: RootState) => state.init);
    const dispatch = useAppDispatch();
    const {i18n} = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    useEffect(() => {
        dispatch(start(true));
    }, [dispatch, init.start]);

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <Layout>
                <Suspense fallback={<Spinner size="lg" centered/>}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Suspense>
            </Layout>
        </BrowserRouter>
    )
}

export default AppRouting
