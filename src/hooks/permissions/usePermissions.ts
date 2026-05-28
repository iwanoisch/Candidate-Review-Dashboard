import {useMemo} from 'react';
import {useAppSelector} from "../../store/store.ts";
import {UserRole} from "../../features/auth/slice/auth.type.ts";
import {Permission, ROLE_PERMISSIONS} from "../../constants/permissions.constant.ts";

export const usePermissions = () => {
    const user = useAppSelector((state) => state.auth.user);
    const role = user?.role as UserRole | undefined;

    const permissions = useMemo<Permission[]>(() => {
        if (!role) return [];
        return ROLE_PERMISSIONS[role] ?? [];
    }, [role]);

    const can = (permission: Permission): boolean => {
        return permissions.includes(permission);
    };

    const canAll = (...perms: Permission[]): boolean => {
        return perms.every(p => permissions.includes(p));
    };

    const canAny = (...perms: Permission[]): boolean => {
        return perms.some(p => permissions.includes(p));
    };

    return {role, permissions, can, canAll, canAny};
};
