import { Auth } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Layout } from "@/shared/components/layout";
import { Loader } from "@/shared/components/loader";
import { Protected } from "@/shared/components/protected";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const Router = () => {
    const router = createBrowserRouter([
        {
            element: (
                <Suspense fallback={<Loader />}>
                    <Layout />
                </Suspense>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <Protected>
                            <Dashboard />
                        </Protected>
                    ),
                },
            ],
        },
        {
            path: "/auth",
            element: <Auth />,
        },
    ]);

    return <RouterProvider router={router} />;
};
