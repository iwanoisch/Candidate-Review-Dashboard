import {ReactNode} from 'react';

export type LanguageType = 'it' | 'en';

export interface LanguageOption {
    id: LanguageType;
    name: string;
    flag: string;
}

export interface LanguageContextValue {
    currentLanguage: LanguageType;
    setLanguage: (language: LanguageType, userId?: string) => void;
    languageOptions: LanguageOption[];
    resetLanguage: () => void;
    loadUserLanguage: (userId: string | number) => void;
}

export interface LanguageProviderProps {
    children: ReactNode;
}
