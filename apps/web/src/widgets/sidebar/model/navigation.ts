import { Cog, FolderClosed, Heart, LayoutGrid, Trash2 } from "lucide-react";
import { NavigationItemType } from "./types";

export const NAVIGATION_ITEMS: NavigationItemType[] = [
    { id: 0, name: "Dashboard", icon: LayoutGrid, path: "/" },
    { id: 1, name: "Files", icon: FolderClosed, path: "/files" },
    { id: 2, name: "Favorites", icon: Heart, path: "/favorites" },
    { id: 3, name: "Settings", icon: Cog, path: "/settings" },
    { id: 4, name: "Trash", icon: Trash2, path: "/trash" },
] as const;
