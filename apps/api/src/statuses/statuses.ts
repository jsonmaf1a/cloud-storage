export const Status = {
    Active: 1,
    Inactive: 2,
    Pending: 3,
    Expired: 4,
    Blocked: 5,
} as const;

export type Status = keyof typeof Status;
