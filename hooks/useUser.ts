import { useEffect, useState } from "react";
import { ENVIRONMENT } from "../lib/util";
import { useError } from "../contexts/errorContext";
import { leagueService } from "../services/apiClients/league.service";
import { dashboardService } from "../services/apiClients/dashboard.service";
import { userService } from "../services/apiClients/user.service";
import { matchService } from "../services/apiClients/match.service";

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
    setUserLeagues(<any[]>userLeagues);
  };

  const getMatches = async () => {
    const { league: leagueId } = dashboard;
    const matchesForLeague = await matchService.getMatchesForLeague(leagueId);
    setMatches(<any[]>matchesForLeague);
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

  const saveDashboard = async () => {
    try {
      await dashboardService.updateDashboard(dashboard["league"], {
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
    leagueInView: {
      value: dashboard["league"],
      onChnage: onDashboardChange("league"),
    },
    currentMatch: {
      value: dashboard["currentMatch"],
      onChnage: onDashboardChange("currentMatch"),
    },
    matches,
    addLeague,
    saveDashbaord: saveDashboard,
  };
};

export default useUser;
