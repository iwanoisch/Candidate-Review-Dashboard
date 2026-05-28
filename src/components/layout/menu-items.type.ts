import {ComponentType, SVGProps} from "react";

export type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type UserRole = 'admin' | 'viewer';

export interface MenuItem {
    id: string;
    name: string;
    href: string;
    icon?: MenuIcon;
    role?: UserRole[] | undefined;
    current?: boolean;
    action?: string;
}
