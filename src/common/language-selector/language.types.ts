import { createContext } from 'react';

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

export const LANGUAGE_STORAGE_KEY = 'app_language';
export const USER_LANGUAGE_PREFIX = 'user_language_';
export const DEFAULT_LANGUAGE: LanguageType = 'it';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    { id: 'it', name: 'Italiano', flag: '🇮🇹' },
    { id: 'en', name: 'English', flag: '🇬🇧' },
];

export const isValidLanguage = (lang: string | null): lang is LanguageType => {
    return lang !== null && LANGUAGE_OPTIONS.some(l => l.id === lang);
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
