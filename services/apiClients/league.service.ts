import { AxiosInstance } from "axios";
import { ENVIRONMENT } from "../../lib/util";
import { getAxios, getCleanPayload, getData } from "./api.client";

const getLeagues = async (axiosClient: AxiosInstance = null) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};
const addLeague = async (
  payload: { leagueName: string },
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
  const response = await getAxios(axiosClient).post(
    URL,
    getCleanPayload(payload)
  );
  return getData(response);
};
const getLeague = async (
  leagueId: string,
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/leagues/${leagueId}`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};
const updateLeague = async (
  leagueId: string,
  payload: { leagueName: string },
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/leagues/${leagueId}`;
  const response = await getAxios(axiosClient).patch(
    URL,
    getCleanPayload(payload)
  );
  return getData(response);
};

export const leagueService = {
  getLeagues,
  addLeague,
  getLeague,
  updateLeague,
};
