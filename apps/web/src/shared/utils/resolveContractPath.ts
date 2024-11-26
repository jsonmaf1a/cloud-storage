// TODO: type-safe params and path
export function resolveContractPath(
    path: string,
    params: Record<string, string>,
): string {
    return Object.keys(params).reduce(
        (acc, key) => acc.replace(`:${key}`, params[key]),
        path,
    );
}
