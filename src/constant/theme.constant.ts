import type {ThemeOption} from '../common/theme-selector/theme.type';

export const LIGHT_THEMES: ThemeOption[] = [
    {id: 'default', name: 'Arancione', description: 'Tema predefinito', color: '#f97316'},
    {id: 'blue', name: 'Blu', description: 'Professionale', color: '#3b82f6'},
    {id: 'green', name: 'Verde', description: 'Natura', color: '#22c55e'},
    {id: 'indigo', name: 'Indaco', description: 'Elegante', color: '#6366f1'},
    {id: 'teal', name: 'Teal', description: 'Fresco', color: '#14b8a6'},
    {id: 'rose', name: 'Rosa', description: 'Caldo', color: '#f43f5e'},
    {id: 'slate', name: 'Grigio', description: 'Minimalista', color: '#64748b'},
];

export const THEME_OPTIONS: ThemeOption[] = [...LIGHT_THEMES];
