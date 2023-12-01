export class BadRequestError extends Error {
    constructor(message = "Bad Request") {
        super(message);
        this.name = 'BadRequestError';
    }
}

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super(message);
        this.name = 'NotFoundError';
    }
}

// error when user already exists
export class ConflictError extends Error {
    constructor(message = "Conflict") {
        super(message);
        this.name = 'ConflictError';
    }
}

export class ConfigurationError extends Error {
    constructor(message = "Configuration Error") {
        super(message);
        this.name = 'ConfigurationError';
    }
}


export class InternalServerError extends Error {
    constructor(message = "Internal Server Error") {
        super(message);
        this.name = 'InternalServerError';
    }
}