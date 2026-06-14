import express from 'express';
import { ResourcesController } from '@/controllers/resources.controller';
import { createResourcesRouter } from '@/routes/resources.router';
import { errorHandler } from '@/middleware/errorHandler';

export class App {
    readonly express: express.Express;

    constructor(private readonly resourcesController: ResourcesController) {
        this.express = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    private setupMiddleware() {
        this.express.use(express.json());
    }

    private setupRoutes() {
        this.express.use('/resources', createResourcesRouter(this.resourcesController));
    }

    private setupErrorHandling(): void {
        this.express.use(errorHandler);
    }
}