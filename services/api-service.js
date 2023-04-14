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

export const userService = {
  getUser: async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/auth/user`;
    const response = await axios.get(URL);
    return getData(response);
  },
};

export const leagueService = {
  getLeagues: async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    const response = await axios.get(URL);
    return getData(response);
  },
  addLeague: async ({ leagueName }) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    const response = await axios.post(URL, { name: leagueName });
    return getData(response);
  },
};

export const dashboardService = {
  getDashboard: async ({ leagueId }) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/dashboard?leagueId=${leagueId}`;
    const response = await axios.get(URL);
    return getData(response);
  },
  updateDashboard: async ({ leagueId, currentMatch, view }) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/dashboard?leagueId=${leagueId}`;
    const payload = getCleanPayload({ currentMatch, view });
    const response = await axios.post(URL, payload);
    return getData(response);
  },
};

export const matchService = {
  getMatchesForLeague: async (leagueId) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/matches?leagueId=${leagueId}`;
    const response = await axios.get(URL);
    return getData(response);
  },
  getMatch: async (matchId) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/matches/${matchId}`;
    const response = await axios.get(URL);
    return getData(response);
  },
};

export const teamService = {
  getTeams: async ({ leagueId }) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/teams?leagueId=${leagueId}`;
    const response = await axios.get(URL);
    return getData(response);
  },
};
