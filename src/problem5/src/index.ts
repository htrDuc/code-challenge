import "dotenv/config";

import { App } from "@/app";
import { ResourcesRepository } from "@/repositories/resources.repository";
import { ResourcesService } from "@/services/resources.service";
import { ResourcesController } from "@/controllers/resources.controller";
import { connect, prisma } from "@/db/prisma";

async function bootstrap() {
    await connect();

    const repository = new ResourcesRepository(prisma);
    const service = new ResourcesService(repository);
    const controller = new ResourcesController(service);
    const app = new App(controller);

    const port = Number(process.env.APP_PORT ?? 3000);

    app.express.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

bootstrap().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
