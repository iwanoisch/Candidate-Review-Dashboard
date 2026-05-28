import type {UserRole} from "../features/auth/slice/auth.type";

export type Permission =
    | 'candidates:read'
    | 'candidates:edit'
    | 'candidates:delete'
    | 'candidates:add_note'
    | 'candidates:change_status'
    | 'settings:edit_profile'
    | 'settings:edit_theme';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    admin: [
        'candidates:read',
        'candidates:edit',
        'candidates:delete',
        'candidates:add_note',
        'candidates:change_status',
        'settings:edit_profile',
        'settings:edit_theme',
    ],
    viewer: [
        'candidates:read',
        'settings:edit_theme',
    ],
};
