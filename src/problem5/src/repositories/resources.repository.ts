import { Prisma, PrismaClient } from "@prisma/client";
import type { CreateResourceInput, Resource, ResourceFilters, UpdateResourceInput } from "@/types/resource.types";

export class ResourcesRepository {
    constructor(private readonly db: PrismaClient) {}

    async create(input: CreateResourceInput): Promise<Resource> {
        return this.db.resource.create({
            data: {
                name: input.name,
                ...(input.status !== undefined && { status: input.status }),
            },
        });
    }

    async findAll(filters: ResourceFilters = {}): Promise<Resource[]> {
        const { status, name, limit = 20, offset = 0 } = filters;
        const where: Prisma.ResourceWhereInput = {};

        if (status) {
            where.status = status;
        }

        if (name) {
            where.name = { contains: name, mode: "insensitive" };
        }

        return this.db.resource.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { createdAt: "desc" },
        });
    }

    async findById(id: string): Promise<Resource | null> {
        return this.db.resource.findUnique({
            where: { id },
        });
    }

    async update(id: string, input: UpdateResourceInput): Promise<Resource> {
        const data: Prisma.ResourceUpdateInput = {};

        if (input.name !== undefined) {
            data.name = input.name;
        }

        if (input.status !== undefined) {
            data.status = input.status;
        }

        return this.db.resource.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.db.resource.delete({
            where: { id },
        });
    }
}
