export class ClientError {
    public constructor(public message: string, public status: number) { }
}

export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(`Route ${route} not exist`, 404);
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(id: number) {
        super(`id ${id} not exist`, 404);
    }
}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(message, 401);
    }
}

