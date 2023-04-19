import React, { useEffect } from "react";
import { useError } from "../contexts/errorContext";

const Toaster = () => {
  const { errors, success, setErrors, setSuccess } = useError();

  const close = () => {
    setErrors([]);
    setSuccess("");
  };

  if (errors && errors?.length > 0) {
    return (
      <div
        className="toast show overlay bg-warning text-light"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-autohide="true"
      >
        <div className="toast-header bg-warning text-light">
          <strong className="me-auto">Oh Snap!</strong>
          <button
            type="button"
            className="btn ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
            onClick={close}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          <ul>
            {errors?.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else if (success && success?.length > 0) {
    return (
      <div
        className="toast show overlay bg-success text-light"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header bg-success text-light">
          <strong className="me-auto">Success!</strong>
          <button
            type="button"
            className="btn ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
            onClick={close}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{success}</div>
      </div>
    );
  }
};

export default Toaster;
