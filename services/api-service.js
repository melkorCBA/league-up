import axios from "axios";
import { ENVIRONMENT } from "../lib/util";

export const userService = {
  getUser: async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/auth/user`;
    const response = await axios.get(URL);
    const { data } = response;
    return data["data"];
  },
};

export const leagueService = {
  getLeagues: async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    const response = await axios.get(URL);
    const { data } = response;
    return data["data"];
  },
  addLeague: async ({ leagueName }) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    const response = await axios.post(URL, { name: leagueName });
    const { data } = response;
    return data["data"];
  },
};

export const dashboardService = {
  updateDashboard: async ({ league, currentMatch }) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/dashboard`;
    const response = await axios.post(URL, {
      league,
      currentMatch,
    });
    const { data } = response;
    return data["data"];
  },
};

export const matchService = {
  getMatchesForLeague: async (leagueId) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/matches?leagueId=${leagueId}`;
    const response = await axios.get(URL);
    const { data } = response;
    return data["data"];
  },
};
