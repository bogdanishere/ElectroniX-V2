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
  constructor(message: string = "400") {
    super(message, 400);
  }
}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError {
  constructor(message: string = "401") {
    super(message, 401);
  }
}

/**
 * Status code: 404
 */
export class NotFoundError extends HttpError {
  constructor(message: string = "404") {
    super(message, 404);
  }
}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {
  constructor(message: string = "409") {
    super(message, 409);
  }
}

/**
 * Status code: 429
 */
export class TooManyRequestsError extends HttpError {
  constructor(message: string = "429") {
    super(message, 429);
  }
}

/**
 * Status code: 500
 */

export class InternalServerError extends HttpError {
  constructor(message: string = "500") {
    super(message, 500);
  }
}
