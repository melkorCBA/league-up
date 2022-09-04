class CustomeError extends Error {
  constructor(message, cause) {
    super(message, cause);
    this.statusCode;
  }
}

class Unauthorized extends CustomeError {
  constructor(message) {
    super(message, "Auth headers are missing");
    this.statusCode = 401;
  }
}

class BadRequest extends CustomeError {
  constructor(message) {
    super(message, "Request validation issue");
    this.statusCode = 400;
  }
}

class Forbidden extends CustomeError {
  constructor() {
    super("Accsess Forbidden", "Accsess Forbidden");
    this.statusCode = 403;
  }
}

class NotFound extends CustomeError {
  constructor() {
    super(
      "The server can not find the requested resource",
      "The server can not find the requested resource"
    );
    this.statusCode = 404;
  }
}

export { Unauthorized, BadRequest, Forbidden, NotFound };
