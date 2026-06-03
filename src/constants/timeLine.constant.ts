import type {TimelineEvent} from "../features/applicant/applicant.type.ts";
import {ChatBubbleLeftIcon, ClockIcon, PlusCircleIcon, UserIcon} from "@heroicons/react/24/outline";

export const EVENT_CONFIG: Record<TimelineEvent['type'], {
    icon: typeof ClockIcon;
    bg: string;
    border: string;
    iconColor: string;
}> = {
    created: {
        icon: PlusCircleIcon,
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        iconColor: 'text-blue-600',
    },
    status_change: {
        icon: UserIcon,
        bg: 'bg-primary-50',
        border: 'border-primary-100',
        iconColor: 'text-primary-600',
    },
    note_added: {
        icon: ChatBubbleLeftIcon,
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        iconColor: 'text-amber-600',
    },
};
