export type ThemeType = 'default' | 'orange' | 'green' | 'blue' | 'slate' | 'rose' | 'teal';
export type BackgroundMode = 'themed' | 'neutral';

export interface ThemeButtonProps {
    theme: ThemeOption;
    isSelected: boolean;
    onClick: () => void;
}

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
