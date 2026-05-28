export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    centered?: boolean;
    className?: string;
}

export const SPINNER_SIZES: Record<NonNullable<SpinnerProps['size']>, string> = {
    sm: 'size-4',
    md: 'size-8',
    lg: 'size-12',
    xl: 'size-16',
};
