import { Unauthorized, BadRequest, Forbidden, NotFound } from "./errors";

const validators = (() => {
  const attach = (req, res, fns) => {
    return new Promise<void>((resolve, reject) => {
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
          ? callback(new BadRequest(message ?? `${field} is required`))
          : callback(true);
      };
    },
    fields: (fields, message) => {
      return function (req, callback) {
        let requiredField: string
        const isAnyUndefined = fields.some(
          (field) => {
            if(req.body[field] === undefined){
              requiredField = field;
              return true;
            }
            return false;
          }
        );
        isAnyUndefined
          ? callback(new BadRequest(message ?? `${requiredField} is required`))
          : callback(true);
      };
    },
    anyfields: (fields, message) => {
      return function (req, callback) {
        const isAnyPresent = fields.some(
          (field) => req.body[field] !== undefined
        );
        !isAnyPresent
          ? callback(new BadRequest(message ?? `at least one field is required`))
          : callback(true);
      };
    },
  };

  const headers = {
    header: (headerName, message) => {
      return function (req, callback) {
        req.headers[headerName] === undefined
          ? callback(
              new Unauthorized(message ?? `${headerName} header is required`)
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
                message ?? `${queryParamName} header is required`
              )
            )
          : callback(true);
      };
    },
  };

  const compare = {
    bodyFields: (field1, field2, compareFunc, message) => {
      return function (req, callback) {
        const f1 = req.body[field1];
        const f2 = req.body[field2];
        if (f1 === undefined || f1 === undefined) {
          callback(new BadRequest(`${field1 + "," + field2} not defined`));
          return;
        }

        const isMatched = compareFunc(f1, f2);
        if (!isMatched) {
          callback(
            new BadRequest(message ?? `${field1 + "," + field2} not matched`)
          );
          return;
        }
        callback(true);
      };
    },
  };

  return {
    attach,
    body,
    headers,
    queryParams,
    compare,
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
