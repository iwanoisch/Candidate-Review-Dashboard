import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';
import type {ThemeContextValue} from '../../common/theme-selector/theme.type';

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve essere usato dentro ThemeProvider');
    }
    return context;
};
