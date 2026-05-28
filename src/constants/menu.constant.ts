import {
    Squares2X2Icon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {MenuItem} from "../components/layout/menu-items.type.ts";

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
