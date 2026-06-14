export type { Resource } from "@prisma/client";

export type ResourceStatus = "active" | "archived";

export interface CreateResourceInput {
    name: string;
    status?: ResourceStatus;
}

export interface UpdateResourceInput {
    name?: string;
    status?: ResourceStatus;
}

export interface ResourceFilters {
    status?: ResourceStatus;
    name?: string;
    limit?: number;
    offset?: number;
}
