import axios from "axios";
import { useState } from "react";
import { useError } from "../contexts/errorContext";
import { ENVIRONMENT } from "../lib/util";

const RequestMethods = Object.freeze({
  POST: "post",
  PATCH: "patch",
  PUT: "put",
  GET: "get",
  DELETE: "delete",
});

const UseRequest = (
  { url, method, body, onSuccess },
  { onSuccessMsg, onErrorMsg }
) => {
  const { setErrors, setSuccess } = useError();
  const doRequest = async () => {
    try {
      setErrors(null);
      setSuccess("");
      const response = await axios[method](url, body);
      if (onSuccess) {
        if (onSuccessMsg) setSuccess(onSuccessMsg);
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors([onErrorMsg ?? err["message"]]);
    }
  };

  return {
    doRequest,
    RequestMethods,
  };
};

export { UseRequest, RequestMethods };
