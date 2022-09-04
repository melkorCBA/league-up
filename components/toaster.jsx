import React, { useEffect } from "react";
import { useError } from "../contexts/errorContext";

const Toaster = () => {
  const { errors, success, setErrors, setSuccess } = useError();
  useEffect(() => {
    setTimeout(() => {
      console.log("Error state update");
      if (errors && errors.lenght > 0) {
        setErrors([]);
      }
      if (success !== "" && success.length > 0) {
        setSuccess("");
      }
    }, 5000);
  }, [errors, setErrors, setSuccess, success]);
  if (errors && errors?.length > 0) {
    return (
      <div
        className="toast show overlay bg-warning text-light"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header bg-warning text-light">
          <strong className="me-auto">Oh Snap!</strong>
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
        </div>
        <div className="toast-body">{success}</div>
      </div>
    );
  }
};

export default Toaster;
