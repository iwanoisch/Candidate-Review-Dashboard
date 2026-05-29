import type {StatCardVariant} from '../common/stat-card/StatCard.type';

export const variantStyles: Record<StatCardVariant, { bg: string; text: string; border: string }> = {
    primary: {
        bg: 'bg-primary-50',
        text: 'text-primary-600',
        border: 'border-primary-100',
    },
    amber: {
        bg: 'bg-amber-50',
        text: 'text-amber-600',
        border: 'border-amber-100',
    },
    emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-100',
    },
    indigo: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        border: 'border-indigo-100',
    },
};
