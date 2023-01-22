import axios from "axios";
import { ENVIRONMENT } from "./util";

const axiosClient = (req, baseURL = ENVIRONMENT.BaseURL) => {
  if (typeof window === "undefined") {
    // in server
    // accsesing the ingress controller
    // current namespace= default
    // ingrss-controller namespace = ingress-nginx
    return axios.create({
      baseURL,
      headers: req.headers,
    });
  }

  // in browser
  return axios.create({});
};

export { axiosClient };
