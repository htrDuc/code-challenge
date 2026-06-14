import { NotFoundError, ValidationError } from "@/errors/app.errors";
import { ResourcesRepository } from "@/repositories/resources.repository";
import type {
    CreateResourceInput,
    Resource,
    ResourceFilters,
    ResourceStatus,
    UpdateResourceInput,
} from "@/types/resource.types";

const VALID_STATUSES: ResourceStatus[] = ["active", "archived"];

export class ResourcesService {
    constructor(private readonly repository: ResourcesRepository) {}

    async create(input: CreateResourceInput): Promise<Resource> {
        if (!input.name?.trim()) {
            throw new ValidationError("Name is required");
        }

        if (input.status !== undefined) {
            this.validateStatus(input.status);
        }

        return this.repository.create({
            name: input.name.trim(),
            status: input.status,
        });
    }

    async list(filters: ResourceFilters): Promise<Resource[]> {
        return this.repository.findAll(filters);
    }

    async getById(id: string): Promise<Resource> {
        const resource = await this.repository.findById(id);
        if (!resource) {
            throw new NotFoundError("Resource not found");
        }
        return resource;
    }

    async update(id: string, input: UpdateResourceInput): Promise<Resource> {
        const resource = await this.repository.findById(id);
        if (!resource) {
            throw new NotFoundError("Resource not found");
        }

        if (input.name !== undefined && !input.name.trim()) {
            throw new ValidationError("Name cannot be empty");
        }

        if (input.status !== undefined) {
            this.validateStatus(input.status);
        }

        return this.repository.update(id, {
            ...(input.name !== undefined && { name: input.name.trim() }),
            ...(input.status !== undefined && { status: input.status }),
        });
    }

    async remove(id: string): Promise<void> {
        const resource = await this.repository.findById(id);
        if (!resource) {
            throw new NotFoundError("Resource not found");
        }

        await this.repository.delete(id);
    }

    private validateStatus(status: ResourceStatus): void {
        if (!VALID_STATUSES.includes(status)) {
            throw new ValidationError(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
        }
    }
}
