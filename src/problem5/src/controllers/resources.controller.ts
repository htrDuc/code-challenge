import { ResourcesService } from "@/services/resources.service";
import type { Request, Response } from "express";
import type {
    CreateResourceInput,
    ResourceFilters,
    ResourceStatus,
    UpdateResourceInput,
} from "@/types/resource.types";

export class ResourcesController {
    constructor(private readonly service: ResourcesService) { }

    // create = async (req: Request, res: Response) => {
    //     const input: CreateResourceInput = {
    //         name: req.body.name,
    //         status: req.body.status,
    //     };

    //     const resource = await this.service.create(input);
    //     res.status(201).json(resource);
    // };

    async create(req: Request, res: Response): Promise<void> {
        const input: CreateResourceInput = {
            name: req.body.name,
            status: req.body.status,
        };
        const resource = await this.service.create(input);
        res.status(201).json(resource);
    };

    list = async (req: Request, res: Response) => {
        const filters: ResourceFilters = {
            status: req.query.status as ResourceStatus | undefined,
            name: req.query.name as string | undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            offset: req.query.offset ? Number(req.query.offset) : undefined,
        };

        const resources = await this.service.list(filters);
        res.json(resources);
    };

    getById = async (req: Request, res: Response) => {
        const resource = await this.service.getById(req.params.id as string);
        res.json(resource);
    };

    update = async (req: Request, res: Response) => {
        const input: UpdateResourceInput = {
            name: req.body.name,
            status: req.body.status,
        };
        const resource = await this.service.update(req.params.id as string, input);
        res.json(resource);
    };

    remove = async (req: Request, res: Response) => {
        await this.service.remove(req.params.id as string);
        res.status(204).send();
    };
}
