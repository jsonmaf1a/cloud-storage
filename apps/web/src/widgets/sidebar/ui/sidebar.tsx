import { Logo } from "@/shared/components/logo";
import { Button } from "@/shared/components/ui/button";
import { useLocation } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { NAVIGATION_ITEMS } from "../model/navigation";
import { NavigationItem } from "./navigation-item";

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1400);

    const currentPath = useLocation().pathname;

    console.log(currentPath);

    const handleToggleSidebar = useCallback(() => {
        setIsCollapsed((prev) => !prev);
    }, []);

    return (
        <aside className="flex flex-col h-screen bg-background text-white min-w-72 w-2/12">
            <Logo />
            <ul className="flex flex-col justify-between py-4 gap-4">
                {NAVIGATION_ITEMS.map((item) => (
                    <NavigationItem
                        key={item.id}
                        isSidebarCollapsed={isCollapsed}
                        isActive={item.path === currentPath}
                        item={item}
                    />
                ))}
            </ul>

            <div className="p-8 mt-auto">
                <div className="flex flex-col justify-center items-center gap-3 px-5 py-5 rounded-xl bg-yellow-200 text-center text-black font-medium">
                    Upgrade to Premium
                    <p className="font-light text-sm">
                        Get additional storage, as well as various exclusive features
                    </p>
                    <Button
                        onClick={handleToggleSidebar}
                        className="bg-black text-white p-6 text-md hover:bg-black hover:underline"
                    >
                        Upgrade Now
                    </Button>
                </div>
            </div>
        </aside>
    );
};
