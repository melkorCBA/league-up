import { useCallback, useEffect, useState } from "react";
import client from "../pusher/client";
import { CHANNELS, EVENTS } from "../pusher/constants";
import {
  leagueService,
  matchService,
  teamService,
  userService,
} from "../services/api-service";
import { setClientenvsInSession } from "../lib/util";

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
      const data = await teamService.getTeams({ leagueId });
      setTeams(data);
    },
  };

  useEffect(() => {
    setClientenvsInSession(clientenvs);
  }, []);

  useEffect(() => {
    const pusherClient = client();
    const channels = {
      dashBoard: pusherClient.subscribeTochannel(CHANNELS.DASHBOARD),
      standings: pusherClient.subscribeTochannel(CHANNELS.STANDINGS),
    };
    pusherClient.subscribeToEvent(
      channels.dashBoard,
      EVENTS.DASHBOARD.UPDATE_LEAGUE,
      async (data) => {
        // refetch dashboard data
        refetch.dashboard();
        // reftch team data
        refetch.teams();
      }
    );
    pusherClient.subscribeToEvent(
      channels.dashBoard,
      EVENTS.DASHBOARD.UPDATE_CURRENT_MATCH,
      async (data) => {
        // refetch dashboard data
        refetch.dashboard();
      }
    );
    pusherClient.subscribeToEvent(
      channels.dashBoard,
      EVENTS.DASHBOARD.UPDATE_VIEW,
      async (data) => {
        // refetch dashboard data
        refetch.dashboard();
      }
    );
    pusherClient.subscribeToEvent(
      channels.standings,
      EVENTS.STANDINGS.UPDATE_TEAMS,
      async (data) => {
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
