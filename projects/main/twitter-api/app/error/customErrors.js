class ApplicationError extends Error {
    constructor(message, status) {
        super(message); // Add a "message" property
        this.status = status || 500; // Add a "status" property, default to 500 if not specified
        this.name = this.constructor.name; // Ensure the name of the error is the same as the class name
        Error.captureStackTrace(this, this.constructor); // Captures the stack trace
    }
}

class NotFoundError extends ApplicationError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

class ValidationError extends ApplicationError {
    constructor(message) {
        super(message, 400);
    }
}

class UnauthorizedError extends ApplicationError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

export {
    ApplicationError,
    NotFoundError,
    ValidationError,
    UnauthorizedError
};
