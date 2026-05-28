import {
    Squares2X2Icon,
    Cog6ToothIcon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
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

export const subMenuItems: MenuItem[] = [
    {
        id: "dashboard",
        name: "Dashboard",
        href: "/dashboard",
        icon: Squares2X2Icon,
        current: true,
    },
    {
        id: "settings",
        name: "Impostazioni",
        href: "/settings",
        icon: Cog6ToothIcon,
    },
];

export const userMenuItems: MenuItem[] = [
    {id: "settings", name: "Impostazioni", href: "/settings", icon: Cog6ToothIcon},
    {id: "logout", name: "Logout", href: "#", icon: ArrowLeftStartOnRectangleIcon, action: "logout"},
];
