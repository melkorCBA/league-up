import { AxiosInstance } from "axios";
import { ENVIRONMENT } from "../../lib/util";
import { getAxios, getCleanPayload, getData } from "./api.client";

const getUser = async (axiosClient: AxiosInstance = null) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/auth/user`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};

const getUserDashboard = async (axiosClient: AxiosInstance = null) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/auth/user/dashboard`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};

const updateUserDashboard = async (
  payload: { leagueInViewId: string },
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/auth/user/dashboard`;
  const response = await getAxios(axiosClient).patch(
    URL,
    getCleanPayload(payload)
  );
  return getData(response);
};

export const userService = {
  getUser,
  getUserDashboard,
  updateUserDashboard,
};
