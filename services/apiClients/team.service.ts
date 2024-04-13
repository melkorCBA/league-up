import { AxiosInstance } from "axios";
import { ENVIRONMENT } from "../../lib/util";
import { getAxios, getCleanPayload, getData } from "./api.client";

const getTeams = async (
  leagueId: string,
  axiosClient: AxiosInstance = null
) => {
  let URL = `${ENVIRONMENT().BaseApiURL}/teams`;
  if (leagueId) URL += `?leagueId=${leagueId}`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};
const addTeam = async (
  leagueId: string,
  payload: { teamName: string; logoURL: string; abrev: string },
  axiosClient: AxiosInstance = null
) => {
  let URL = `${ENVIRONMENT().BaseApiURL}/teams`;
  if (leagueId) URL += `?leagueId=${leagueId}`;
  const response = await getAxios(axiosClient).post(
    URL,
    getCleanPayload(payload)
  );
  return getData(response);
};
const getTeam = async (teamId: string, axiosClient: AxiosInstance = null) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/teams/${teamId}`;
  const response = await getAxios(axiosClient).get(URL);
  return getData(response);
};

const updateTeam = async (
  teamId: string,
  payload: {
    teamName?: string;
    abrev?: string;
    logoURL?: string;
    pld?: number;
    win?: number;
    draw?: number;
    loss?: number;
    pts?: number;
    nr?: number;
    isQualified?: boolean;
    isActive?: boolean;
    runsScored?: number;
    runsConceded?: number;
    oversFaced?: number;
    oversBowled?: number;
  },
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/teams/${teamId}`;
  const response = await getAxios(axiosClient).patch(
    URL,
    getCleanPayload(payload)
  );
  return getData(response);
};
const deleteTeam = async (
  teamId: string,
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/teams/${teamId}`;
  const response = await getAxios(axiosClient).delete(URL);
  return getData(response);
};
const syncMatches = async (
  teamId: string,
  payload: { syncStatus: boolean },
  axiosClient: AxiosInstance = null
) => {
  const URL = `${ENVIRONMENT().BaseApiURL}/teams/${teamId}/matches/syncAll`;
  const response = await getAxios(axiosClient).patch(URL, payload);
  return getData(response);
};

export const teamService = {
  getTeams,
  addTeam,
  getTeam,
  updateTeam,
  deleteTeam,
  syncMatches,
};
