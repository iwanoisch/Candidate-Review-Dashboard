import './i18n';
import * as ReactDOM from 'react-dom/client';
import AppRouting from "./AppRouting.tsx";
import {persistor, store} from "./store/store.ts";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {Spinner} from "./common/spinner/Spinner.tsx";
import {ModalDialogProvider} from "./common/modal-dialog/ModalDialogProvider.tsx";
import {AlertProvider} from "./common/alert/AlertProvider.tsx";
import {ThemeProvider} from "./common/theme-selector/ThemeProvider.tsx";
import {LanguageProvider} from "./common/language-selector/LanguageProvider.tsx";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const loadSpinner = <Spinner size="xl" centered/>;

root.render(
    <Provider store={store}>
        <PersistGate loading={loadSpinner} persistor={persistor}>
            <ThemeProvider>
                <LanguageProvider>
                    <AlertProvider>
                        <ModalDialogProvider>
                            <AppRouting/>
                        </ModalDialogProvider>
                    </AlertProvider>
                </LanguageProvider>
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
