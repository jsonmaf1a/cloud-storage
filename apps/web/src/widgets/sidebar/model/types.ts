import { ValidRoutes } from "@/shared/types";
import { LucideIcon } from "lucide-react";

export type NavigationItemType = {
    id: number;
    name: string;
    icon: LucideIcon;
    path: ValidRoutes;
};
