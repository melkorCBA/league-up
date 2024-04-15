import { AxiosInstance } from "axios";
import { getAxios, getCleanPayload, getData } from "./api.client";
import { ENVIRONMENT } from "../../lib/util";

export const getDashboard = async (
  leagueId: string,
  axiosClient: AxiosInstance = null
) => {
  let URL = `${ENVIRONMENT().BaseApiURL}/dashboard`;
  if (leagueId) URL += `?leagueId=${leagueId}`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};
export const updateDashboard = async (
  leagueId: string,
  payload: { currentMatch?: string; view?: string },
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/dashboard?leagueId=${leagueId}`;
  const response = await getAxios(axiosClient).patch(
    URL,
    getCleanPayload(payload)
  );
  return getData(response);
};

export const dashboardService = {
  getDashboard,
  updateDashboard,
};
