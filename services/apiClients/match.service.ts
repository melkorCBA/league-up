import { AxiosInstance } from "axios";
import { ENVIRONMENT } from "../../lib/util";
import { getAxios, getData, getCleanPayload } from "./api.client";

const getMatchesForLeague = async (
  leagueId: string,
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/matches?leagueId=${leagueId}`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};
const getMatch = async (matchId: string, axiosClient: AxiosInstance = null) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/matches/${matchId}`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};
const addMatch = async (
  leagueId: string,
  payload: { team1Id: string; team2Id: string },
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/matches?leagueId=${leagueId}`;
  const response = await getAxios(axiosClient).post(
    URL,
    getCleanPayload(payload)
  );
  return getData(response);
};

export const matchService = {
  getMatchesForLeague,
  getMatch,
  addMatch,
};
