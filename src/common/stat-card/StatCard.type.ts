import type {ComponentType, SVGProps} from 'react';

export type StatCardVariant = 'primary' | 'amber' | 'emerald' | 'indigo';

export interface StatCardProps {
    label: string;
    value: string | number;
    description: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    variant?: StatCardVariant;
}
