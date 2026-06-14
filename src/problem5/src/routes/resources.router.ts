import { Router } from 'express';
import type { ResourcesController } from '@/controllers/resources.controller';
import { asyncHandler } from '@/middleware/asyncHandler';

export function createResourcesRouter(controller: ResourcesController) {
    const router = Router();

    router.post("/", asyncHandler(controller.create));
    router.get("/", asyncHandler(controller.list));
    router.get("/:id", asyncHandler(controller.getById));
    router.patch("/:id", asyncHandler(controller.update));
    router.delete("/:id", asyncHandler(controller.remove));

    return router;
}