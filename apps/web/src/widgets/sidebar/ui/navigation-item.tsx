import { cn } from "@/shared/lib/utils";
import { Link } from "@tanstack/react-router";
import { NavigationItemType } from "../model/types";

interface Props {
    item: NavigationItemType;
    isActive: boolean;
    isSidebarCollapsed: boolean;
}

export function NavigationItem({ item, isActive }: Props) {
    return (
        <li className="relative">
            <div
                className={cn(
                    "absolute left-0 h-full bg-yellow-500 w-0 transition-all duration-200",
                    isActive && "w-1",
                )}
            />
            <Link
                to={item.path}
                className={cn(
                    "flex flex-row items-center transition-all duration-200",
                    "text-ltgray-foreground",
                    isActive && "text-white",
                    "py-3 px-8",
                    !isActive && "hover:text-gray-400",
                )}
            >
                <item.icon className="mr-3" size={25} />

                <span className="text-xl font-light">{item.name}</span>
            </Link>
        </li>
    );
}
