export const ExposeGroup = {
    Self: "self",
    Public: "public",
} as const;

export type ExposeGroup = keyof typeof ExposeGroup;
