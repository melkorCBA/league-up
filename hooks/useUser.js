import { useEffect, useState } from "react";
import { ENVIRONMENT } from "../lib/util";
import axios from "axios";
import { useError } from "../contexts/errorContext";

const useUser = (initialUserDashboard) => {
  const [user, setUser] = useState({});
  const [userLeagues, setUserLeagues] = useState([]);
  const [dashboard, setDashboard] = useState(initialUserDashboard);
  const [matches, setMatches] = useState([]);
  const { setErrors, setSuccess } = useError();

  const getUser = async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/auth/user`;
    const response = await axios.get(URL);
    const { data } = response;
    setUser(data["data"]);
  };

  const getUserLeagues = async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    const response = await axios.get(URL);
    const { data } = response;
    setUserLeagues(data["data"]);
  };

  const getMatches = async () => {
    const { league: leagueId } = dashboard;
    const URL = `${ENVIRONMENT().BaseApiURL}/matches?leagueId=${leagueId}`;
    const response = await axios.get(URL);
    const { data } = response;
    setMatches(data["data"]);
  };

  const addLeague = async ({ leagueName }) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/leagues`;
    try {
      const response = await axios.post(URL, { name: leagueName });
      const { data } = response;
      setUserLeagues([...userLeagues, data["data"]]);
      setSuccess("New League added");
    } catch (err) {
      setErrors(["Adding a New League Faild!", err["message"]]);
    }
  };

  const onDashboardChange = function (prop) {
    return function (value) {
      if (dashboard[prop]) {
        setDashboard({ ...dashboard, [prop]: value });
      }
    };
  };

  const saveDashbaord = async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/dashboard`;
    try {
      await axios.post(URL, {
        league: dashboard["league"],
        currentMatch: dashboard["currentMatch"],
      });
      setSuccess("Dashboard Saved!");
    } catch (err) {
      setErrors(["Dashboard Save faild!", err["message"]]);
    }
  };

  useEffect(() => {
    getUser();
    getUserLeagues();
  }, []);

  useEffect(() => {
    getMatches();
  }, [dashboard.league]);

  return {
    user,
    leagues: userLeagues,
    defaultLeague: {
      value: dashboard["league"],
      onChnage: onDashboardChange("league"),
    },
    currentMatch: {
      value: dashboard["currentMatch"],
      onChnage: onDashboardChange("currentMatch"),
    },
    matches,
    addLeague,
    saveDashbaord,
  };
};

export default useUser;
