import {useState, useLayoutEffect, useCallback} from 'react';
import i18n from '../../i18n';
import {LanguageContext} from '../../hooks/language/LanguageContext';
import type {LanguageType, LanguageContextValue, LanguageProviderProps} from './language.types';
import {
    LANGUAGE_STORAGE_KEY,
    USER_LANGUAGE_PREFIX,
    DEFAULT_LANGUAGE,
    LANGUAGE_OPTIONS,
} from '../../constants/language.constant';
import {getSavedLanguage, isValidLanguage} from '../../utility/language.utils';

export const LanguageProvider = ({children}: LanguageProviderProps) => {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(getSavedLanguage);

    useLayoutEffect(() => {
        if (i18n.language !== currentLanguage) {
            i18n.changeLanguage(currentLanguage);
        }
    }, [currentLanguage]);

    const setLanguage = useCallback((language: LanguageType, userId?: string) => {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        setCurrentLanguage(language);
        i18n.changeLanguage(language);

        if (userId) {
            localStorage.setItem(`${USER_LANGUAGE_PREFIX}${userId}`, language);
        }
    }, []);

    const resetLanguage = useCallback(() => {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE);
        setCurrentLanguage(DEFAULT_LANGUAGE);
        i18n.changeLanguage(DEFAULT_LANGUAGE);
    }, []);

    const loadUserLanguage = useCallback((userId: string | number) => {
        const savedLanguage = localStorage.getItem(`${USER_LANGUAGE_PREFIX}${userId}`);
        const language = isValidLanguage(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;

        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        setCurrentLanguage(language);
        i18n.changeLanguage(language);
    }, []);

    const value: LanguageContextValue = {
        currentLanguage,
        setLanguage,
        languageOptions: LANGUAGE_OPTIONS,
        resetLanguage,
        loadUserLanguage
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
