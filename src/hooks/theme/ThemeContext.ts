import {createContext} from 'react';
import type {ThemeContextValue} from '../../common/theme-selector/theme.type';

export const ThemeContext = createContext<ThemeContextValue | null>(null);
