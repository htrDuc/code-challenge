import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

export async function connect(retries = 10, delay = 2000): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await prisma.$connect();
            console.log("Database connected");
            return;
        } catch {
            console.log(`DB not ready (${attempt}/${retries}), retrying...`);
            if (attempt === retries) {
                throw new Error("Could not connect to database");
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}
