import type {LanguageType} from '../common/language-selector/language.types';
import {LANGUAGE_OPTIONS, LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE} from '../constants/language.constant';

export const isValidLanguage = (lang: string | null): lang is LanguageType => {
    return lang !== null && LANGUAGE_OPTIONS.some(l => l.id === lang);
};

export const getSavedLanguage = (): LanguageType => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isValidLanguage(saved) ? saved : DEFAULT_LANGUAGE;
};
