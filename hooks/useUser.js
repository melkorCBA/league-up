import { useEffect, useState } from "react";
import { ENVIRONMENT } from "../lib/util";
import { useError } from "../contexts/errorContext";
import {
  userService,
  leagueService,
  matchService,
  dashboardService,
} from "../services/api-service";

const useUser = (initialUserDashboard) => {
  const [user, setUser] = useState({});
  const [userLeagues, setUserLeagues] = useState([]);
  const [dashboard, setDashboard] = useState(initialUserDashboard);
  const [matches, setMatches] = useState([]);
  const { setErrors, setSuccess } = useError();

  const getUser = async () => {
    const user = await userService.getUser();
    setUser(user);
  };

  const getUserLeagues = async () => {
    const userLeagues = await leagueService.getLeagues();
    setUserLeagues(userLeagues);
  };

  const getMatches = async () => {
    const { league: leagueId } = dashboard;
    const matchesForLeague = await matchService.getMatchesForLeague(leagueId);
    setMatches(matchesForLeague);
  };

  const addLeague = async ({ leagueName }) => {
    try {
      const updatedLeague = await leagueService.addLeague({ leagueName });
      setUserLeagues([...userLeagues, updatedLeague]);
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
    try {
      await dashboardService.updateDashboard({
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
