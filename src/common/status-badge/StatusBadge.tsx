import type {StatusBadgeProps} from './StatusBadge.type';
import {statusConfig} from '../../utility/status-badge.utils';

export const StatusBadge = ({status, size = 'sm'}: StatusBadgeProps) => {
    const config = statusConfig[status];
    const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

    return (
        <span
            className={`inline-block font-semibold border rounded-lg text-center shadow-sm ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}
            role="status"
        >
            {config.label}
        </span>
    );
};
