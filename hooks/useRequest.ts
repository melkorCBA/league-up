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
  {
    url,
    method,
    body,
    onSuccess,
    onError,
  }: {
    url: string;
    method: string;
    body: { [key: string]: unknown };
    onSuccess?: (data: unknown) => void;
    onError?: (data: unknown) => void;
  },
  { onSuccessMsg, onErrorMsg }: { onSuccessMsg?: string; onErrorMsg?: string }
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
      if (onError) onError(err);
      setErrors([onErrorMsg ?? err["message"]]);
    }
  };

  return {
    doRequest,
    RequestMethods,
  };
};

export { UseRequest, RequestMethods };
