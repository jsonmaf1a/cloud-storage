import { lazy } from "react";

export function lazyImport<
    T extends Record<string, React.ComponentType<unknown>>,
>(loader: () => Promise<T>, name: keyof T) {
    return lazy(async () => {
        const module = await loader();
        return { default: module[name] };
    });
}
