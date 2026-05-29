import type {ThemeOption} from '../common/theme-selector/theme.type';

export const LIGHT_THEMES: ThemeOption[] = [
    {id: 'default', name: 'Bento Indigo', description: 'Tema predefinito', color: '#4f46e5'},
    {id: 'orange', name: 'Arancione', description: 'Energetico', color: '#f97316'},
    {id: 'blue', name: 'Blu', description: 'Professionale', color: '#3b82f6'},
    {id: 'green', name: 'Verde', description: 'Natura', color: '#22c55e'},
    {id: 'teal', name: 'Teal', description: 'Fresco', color: '#14b8a6'},
    {id: 'rose', name: 'Rosa', description: 'Caldo', color: '#f43f5e'},
    {id: 'slate', name: 'Grigio', description: 'Minimalista', color: '#64748b'},
];

export const THEME_OPTIONS: ThemeOption[] = [...LIGHT_THEMES];

export const THEME_STORAGE_KEY = 'app_theme';
export const BG_MODE_STORAGE_KEY = 'app_bg_mode';
export const USER_THEME_PREFIX = 'user_theme_';
export const USER_BG_MODE_PREFIX = 'user_bg_mode_';
