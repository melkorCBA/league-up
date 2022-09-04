import { Unauthorized, BadRequest, Forbidden, NotFound } from "./errors";

const validators = (() => {
  const attach = (req, res, fns) => {
    return new Promise((resolve, reject) => {
      const errors = [];
      for (const fn of fns) {
        fn(req, (result) => {
          if (result instanceof Unauthorized) {
            return reject(result);
          }
          if (result instanceof BadRequest) {
            errors.push(result);
          }
        });
      }

      if (errors.length > 0) return reject(errors);
      return resolve();
    });
  };
  const body = {
    field: (field, message) => {
      return function (req, callback) {
        req.body[field] === undefined
          ? callback(new BadRequest(message ?? `${field} is requried`))
          : callback(true);
      };
    },
  };

  const headers = {
    header: (headerName, message) => {
      return function (req, callback) {
        req.headers[headerName] === undefined
          ? callback(
              new Unauthorized(message ?? `${headerName} header is requried`)
            )
          : callback(true);
      };
    },
  };

  const queryParams = {
    queryParam: (queryParamName, message) => {
      return function (req, callback) {
        req.query[queryParamName] === undefined
          ? callback(
              new Unauthorized(
                message ?? `${queryParamName} header is requried`
              )
            )
          : callback(true);
      };
    },
  };

  return {
    attach,
    body,
    headers,
    queryParams,
  };
})();

function errorHandler(err, res) {
  if (err instanceof Unauthorized) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof Forbidden) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof NotFound) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  // bad request
  if (err.length > 0) {
    return res.status(err[0].statusCode).json({
      message: "Validation Error",
      fields: err?.map((e) => e.message),
    });
  }

  // default to 500 server error
  console.error(err);
  return res.status(500).json({ message: err.message });
}

export { errorHandler, validators };
