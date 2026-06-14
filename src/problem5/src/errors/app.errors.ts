export class AppError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}