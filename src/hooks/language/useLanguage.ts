import {useContext} from 'react';
import {LanguageContext} from './LanguageContext';
import type {LanguageContextValue} from '../../common/language-selector/language.types';

export const useLanguage = (): LanguageContextValue => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage deve essere usato dentro LanguageProvider');
    }
    return context;
};
