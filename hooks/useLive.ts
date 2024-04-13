import { useEffect, useState } from "react";
import client from "../pusher/client";
import { setClientenvsInSession } from "../lib/util";
import { leagueService } from "../services/apiClients/league.service";
import { userService } from "../services/apiClients/user.service";
import { matchService } from "../services/apiClients/match.service";
import { teamService } from "../services/apiClients/team.service";

const useLive = (initialData, clientenvs) => {
  const [leagueInView, setLeagueInView] = useState(initialData.leagueInView);
  const [dashboard, setDashboard] = useState(initialData.dashboard);
  const [matchInView, setmatchInView] = useState(initialData.matchInView);
  const [teams, setTeams] = useState(initialData.teams);

  const refetch = {
    leagueInView: async () => {
      const leagueId = dashboard.league;
      const data = await leagueService.getLeague(leagueId);
      setLeagueInView(data);
    },
    dashboard: async () => {
      const data = await userService.getUserDashboard();
      setDashboard(data);
    },
    matchInView: async () => {
      const matchId = dashboard.currentMatch;
      const data = await matchService.getMatch(matchId);
      setmatchInView(data);
    },
    teams: async () => {
      const { leagueId } = dashboard;
      const data = await teamService.getTeams(leagueId);
      setTeams(data);
    },
  };

  useEffect(() => {
    setClientenvsInSession(clientenvs);
  }, []);

  useEffect(() => {
    const pusherClient = client();
    const channels = {
      dashBoard: pusherClient.subscribeChannel("dashboard"),
      standings: pusherClient.subscribeChannel("standings"),
    };
    pusherClient.subscribeToEvent(
      channels.dashBoard,
      "DASHBOARD_updateLeagueInView",
      async () => {
        // refetch dashboard data
        refetch.dashboard();
        // retch team data
        refetch.teams();
      }
    );
    pusherClient.subscribeToEvent(
      channels.dashBoard,
      "DASHBOARD_updateCurrentMatch",
      async () => {
        // refetch dashboard data
        refetch.dashboard();
      }
    );
    pusherClient.subscribeToEvent(
      channels.dashBoard,
      "DASHBOARD_updateView",
      async () => {
        // refetch dashboard data
        refetch.dashboard();
      }
    );
    pusherClient.subscribeToEvent(
      channels.standings,
      "STANDINGS_updateTeams",
      async () => {
        // refetch teams
        refetch.teams();
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetch.matchInView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard.currentMatch]);
  useEffect(() => {
    refetch.leagueInView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard.league]);

  return {
    leagueInView,
    dashboard,
    view: dashboard.view,
    matchInView,
    teams,
  };
};

export default useLive;
