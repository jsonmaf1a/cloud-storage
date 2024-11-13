export const ExposeGroup = {
    Self: "self",
    Public: "public",
    Admin: "admin",
} as const;

export type ExposeGroup = keyof typeof ExposeGroup;
