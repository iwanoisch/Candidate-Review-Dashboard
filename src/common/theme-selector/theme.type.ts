export type ThemeType = 'default' | 'green' | 'blue' | 'indigo' | 'slate' | 'rose' | 'teal';
export type BackgroundMode = 'themed' | 'neutral';

export interface ThemeOption {
    id: ThemeType;
    name: string;
    description: string;
    color: string;
}

export interface ThemeContextValue {
    currentTheme: ThemeType;
    setTheme: (theme: ThemeType, userId?: string) => void;
    backgroundMode: BackgroundMode;
    setBackgroundMode: (mode: BackgroundMode, userId?: string) => void;
    themeOptions: ThemeOption[];
    getCurrentThemeInfo: () => ThemeOption;
    resetTheme: () => void;
    loadUserTheme: (userId: string | number) => void;
}

export const THEME_STORAGE_KEY = 'app_theme';
export const BG_MODE_STORAGE_KEY = 'app_bg_mode';
export const USER_THEME_PREFIX = 'user_theme_';
export const USER_BG_MODE_PREFIX = 'user_bg_mode_';
