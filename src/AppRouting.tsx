import {RouterProvider} from "react-router-dom";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {RootState, useAppDispatch} from "./store/store.ts";
import {useSelector} from "react-redux";
import {start} from "./features/init/slice/initSlice.ts";
import {router} from "./utility/routes.utils.tsx";

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

    return <RouterProvider router={router}/>;
}

export default AppRouting;
