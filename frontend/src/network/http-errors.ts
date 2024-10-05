class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Status code: 400
 */
export class BadRequestError extends HttpError {
  constructor(message: string = "Bad Request. The request is invalid") {
    super(message, 400);
  }
}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError {
  constructor(
    message: string = "Unauthorized. You are not authorized to access this resource"
  ) {
    super(message, 401);
  }
}

/**
 * Status code: 404
 */
export class NotFoundError extends HttpError {
  constructor(
    message: string = "Not Found. The resource you are looking for does not exist"
  ) {
    super(message, 404);
  }
}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {
  constructor(
    message: string = "Conflict. Probably you are trying to create a resource that already exists"
  ) {
    super(message, 409);
  }
}

/**
 * Status code: 429
 */
export class TooManyRequestsError extends HttpError {
  constructor(message: string = "Too Many Requests") {
    super(message, 429);
  }
}

/**
 * Status code: 500
 */

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500);
  }
}
