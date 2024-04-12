import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ENVIRONMENT } from "../../lib/util";

type API_CLIENT_RESPONSE = {
  data: unknown;
};

type InputPayload = { [key: string]: unknown };

// export const getData = <T>(response:AxiosResponse<API_CLIENT_RESPONSE<T>>,) => response.data?.data;
export const getData = (response: AxiosResponse<API_CLIENT_RESPONSE>) =>
  response.data?.data;

export const getAxios = (axiosClient: AxiosInstance) => axiosClient ?? axios;

export const getCleanPayload = <T extends InputPayload>(
  inputPayload: InputPayload
) => {
  const payloadOut: Partial<T> = {};
  Object.keys(inputPayload).forEach((key) => {
    if (inputPayload[key] !== undefined)
      payloadOut[key as keyof T] = inputPayload[key] as T[keyof T];
  });
  return payloadOut;
};

export const axiosClient = (req, baseURL = ENVIRONMENT().BaseURL) => {
  if (typeof window === "undefined") {
    // in server
    // accessing the ingress controller
    // current namespace= default
    // ingress-controller namespace = ingress-nginx
    return axios.create({
      baseURL,
      headers: req.headers,
    });
  }

  // in browser
  return axios.create({});
};
