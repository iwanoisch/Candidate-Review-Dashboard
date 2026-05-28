import {createContext} from 'react';
import type {LanguageContextValue} from '../../common/language-selector/language.types';

export const LanguageContext = createContext<LanguageContextValue | null>(null);
