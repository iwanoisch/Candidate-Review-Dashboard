import {useState, useLayoutEffect, useCallback, ReactNode} from 'react';
import {ThemeContext} from '../../hooks/theme/ThemeContext';
import {
    THEME_OPTIONS,
    THEME_STORAGE_KEY,
    BG_MODE_STORAGE_KEY,
    USER_THEME_PREFIX,
    USER_BG_MODE_PREFIX,
} from '../../constants/theme.constant';
import type {
    ThemeType,
    BackgroundMode,
    ThemeContextValue,
    ThemeOption,
} from './theme.type';

const getSavedTheme = (): ThemeType => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
    return saved && THEME_OPTIONS.some(t => t.id === saved) ? saved : 'default';
};

const getSavedBackgroundMode = (): BackgroundMode => {
    const saved = localStorage.getItem(BG_MODE_STORAGE_KEY);
    return saved === 'neutral' ? 'neutral' : 'themed';
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>(getSavedTheme);
    const [backgroundMode, setBackgroundModeState] = useState<BackgroundMode>(getSavedBackgroundMode);

    useLayoutEffect(() => {
        const {dataset} = document.documentElement;
        dataset.theme = currentTheme;
        dataset.bg = backgroundMode;
    }, [currentTheme, backgroundMode]);

    const setTheme = useCallback((theme: ThemeType, userId?: string) => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        setCurrentTheme(theme);

        if (userId) {
            localStorage.setItem(`${USER_THEME_PREFIX}${userId}`, theme);
        }
    }, []);

    const setBackgroundMode = useCallback((mode: BackgroundMode, userId?: string) => {
        localStorage.setItem(BG_MODE_STORAGE_KEY, mode);
        setBackgroundModeState(mode);

        if (userId) {
            localStorage.setItem(`${USER_BG_MODE_PREFIX}${userId}`, mode);
        }
    }, []);

    const resetTheme = useCallback(() => {
        localStorage.setItem(THEME_STORAGE_KEY, 'default');
        localStorage.setItem(BG_MODE_STORAGE_KEY, 'themed');
        setCurrentTheme('default');
        setBackgroundModeState('themed');
    }, []);

    const loadUserTheme = useCallback((userId: string | number) => {
        const savedTheme = localStorage.getItem(`${USER_THEME_PREFIX}${userId}`) as ThemeType | null;
        const savedBgMode = localStorage.getItem(`${USER_BG_MODE_PREFIX}${userId}`);

        const theme = savedTheme && THEME_OPTIONS.some(t => t.id === savedTheme) ? savedTheme : 'default';
        const bgMode: BackgroundMode = savedBgMode === 'neutral' ? 'neutral' : 'themed';

        localStorage.setItem(THEME_STORAGE_KEY, theme);
        localStorage.setItem(BG_MODE_STORAGE_KEY, bgMode);
        setCurrentTheme(theme);
        setBackgroundModeState(bgMode);
    }, []);

    const getCurrentThemeInfo = useCallback((): ThemeOption => {
        return THEME_OPTIONS.find(t => t.id === currentTheme) || THEME_OPTIONS[0];
    }, [currentTheme]);

    const value: ThemeContextValue = {
        currentTheme,
        setTheme,
        backgroundMode,
        setBackgroundMode,
        themeOptions: THEME_OPTIONS,
        getCurrentThemeInfo,
        resetTheme,
        loadUserTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
