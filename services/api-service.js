import axios from "axios";
import { ENVIRONMENT } from "../lib/util";

const getCleanPayload = (payloadIn) => {
  const payloadOut = {};
  Object.keys(payloadIn).forEach((key) => {
    if (payloadIn[key] !== undefined) payloadOut[key] = payloadIn[key];
  });
  return payloadOut;
};

const getData = (response) => response.data?.data;

function getAxios(axiosClient) {
  return axiosClient ?? axios;
}

export const userService = {
  getUser: async (axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/auth/user`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
  getUserDashboard: async (axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/auth/user/dashboard`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
  updateUserDashboard: async ({ leagueInViewId }, axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/auth/user/dashboard`;
    const response = await getAxios(axiosClient).patch(URL, { leagueInViewId });
    return getData(response);
  },
};

export const leagueService = {
  getLeagues: async (axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
  getLeague: async (leagueId, axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues/${leagueId}`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
  addLeague: async ({ leagueName }, axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    const response = await getAxios(axiosClient).post(URL, {
      name: leagueName,
    });
    return getData(response);
  },
};

export const dashboardService = {
  getDashboard: async ({ leagueId }, axiosClient = null) => {
    let URL = `${ENVIRONMENT().BaseApiURL}/dashboard`;
    if (leagueId) URL += `?leagueId=${leagueId}`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
  updateDashboard: async (
    { leagueId, currentMatch, view },
    axiosClient = null
  ) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/dashboard?leagueId=${leagueId}`;
    const payload = getCleanPayload({ currentMatch, view });
    const response = await getAxios(axiosClient).patch(URL, payload);
    return getData(response);
  },
};

export const matchService = {
  getMatchesForLeague: async (leagueId, axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/matches?leagueId=${leagueId}`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
  getMatch: async (matchId, axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/matches/${matchId}`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
  addMatch: async ({ leagueId, team1Id, team2Id }, axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/matches?leagueId=${leagueId}`;
    const response = await getAxios(axiosClient).post(URL, {
      team1Id,
      team2Id,
    });
    return getData(response);
  },
};

export const teamService = {
  getTeams: async ({ leagueId }, axiosClient = null) => {
    let URL = `${ENVIRONMENT().BaseApiURL}/teams`;
    if (leagueId) URL += `?leagueId=${leagueId}`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
};

export const viewService = {
  getViews: async (axiosClient = null) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/views`;
    const response = await getAxios(axiosClient).get(URL);
    return getData(response);
  },
};
