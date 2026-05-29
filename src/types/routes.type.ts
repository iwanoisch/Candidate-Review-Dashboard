import {ComponentType, SVGProps} from "react";
import type {UserRole} from "../features/auth/auth.type";

export type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface RouteConfig {
    path: string;
    component: React.ComponentType;
    access: 'public' | 'protected';
    allowedRoles?: UserRole[];
    menu?: {
        id: string;
        name: string;
        icon?: MenuIcon;
    };
}
