import { ValidRoutes } from "@/shared/types/validRoutes";
import { LucideIcon } from "lucide-react";

export type NavigationItemType = {
    id: number;
    name: string;
    icon: LucideIcon;
    path: ValidRoutes;
};
