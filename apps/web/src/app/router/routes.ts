import { lazyImport } from "@/shared/lib/lazy-import";
import { PageProps } from "@/shared/types/page-props";

export interface RouteConfig {
    path: string;
    element: React.LazyExoticComponent<React.ComponentType<PageProps>>;
    protected: boolean;
    meta?: {
        title: string;
        permissions?: string[];
    };
}

export const routes: Record<string, RouteConfig> = {
    dashboard: {
        path: "/",
        element: lazyImport(() => import("@/pages/dashboard"), "Dashboard"),
        protected: true,
        meta: {
            title: "Dashboard",
        },
    },
};
