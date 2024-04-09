class CustomError extends Error {
  constructor(message, cause) {
    super(message, cause);
    this.statusCode;
  }
}

class Unauthorized extends CustomError {
  constructor(message) {
    super(message, "Auth headers are missing");
    this.statusCode = 401;
  }
}

class BadRequest extends CustomError {
  constructor(message) {
    super(message, "Request validation issue");
    this.statusCode = 400;
  }
}

class Forbidden extends CustomError {
  constructor(message) {
    super("Access Forbidden", message);
    this.statusCode = 403;
  }
}

class NotFound extends CustomError {
  constructor() {
    super(
      "The server can not find the requested resource",
      "The server can not find the requested resource"
    );
    this.statusCode = 404;
  }
}

export { Unauthorized, BadRequest, Forbidden, NotFound };
