import { AxiosInstance } from "axios";
import { ENVIRONMENT } from "../../lib/util";
import { getAxios, getData } from "./api.client";

const getViews = async (axiosClient: AxiosInstance = null) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/views`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};

export const viewService = {
  getViews,
};
