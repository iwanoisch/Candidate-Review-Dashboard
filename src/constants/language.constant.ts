import type {LanguageType, LanguageOption} from '../common/language-selector/language.types';

export const LANGUAGE_STORAGE_KEY = 'app_language';
export const USER_LANGUAGE_PREFIX = 'user_language_';
export const DEFAULT_LANGUAGE: LanguageType = 'it';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    {id: 'it', name: 'Italiano', flag: '🇮🇹'},
    {id: 'en', name: 'English', flag: '🇬🇧'},
];
