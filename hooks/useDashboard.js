import { useEffect, useState } from "react";
import client from "../pusher/client";
import { CHANNELS, EVENTS } from "../pusher/constants";
import { CONSTANTS, setClientenvsInSession } from "../lib/util";
import {
  dashboardService,
  matchService,
  teamService,
  userService,
} from "../services/api-service";
import { ACTIONS, useStore } from "../contexts/storeContext";

const useDashboard = ({ initialData, clientenvs }) => {
  const { store, dispatch } = useStore();
  const [leagueSelected, setLeagueSelected] = useState(
    initialData.leagueInView
  );

  const [dashboard, setDashboard] = useState(initialData.dashboard);
  const [matchInView, setMatchInView] = useState(initialData.matchInView);
  const [teams, setTeams] = useState(initialData.teams);

  const refetch = {
    dashboard: async () => {
      const { _id: leagueId } = leagueSelected;
      const data = await dashboardService.getDashboard({ leagueId });
      setDashboard(data);
    },
    teams: async () => {
      const { _id: leagueId } = leagueSelected;
      const data = await teamService.getTeams({ leagueId });
      setTeams(data);
    },
    matchInView: async () => {
      const matchInViewId = dashboard["currentMatch"];
      const data = await matchService.getMatch(matchInViewId);
      setMatchInView(data);
    },
  };
  useEffect(() => {
    dispatch({
      type: ACTIONS.SetLeagueInView,
      payload: { leagueInView: initialData.leagueInView },
    });
    dispatch({
      type: ACTIONS.SetLeagues,
      payload: { leagues: initialData.leagues },
    });
    // add envs to session
    setClientenvsInSession(clientenvs);
  }, []);

  useEffect(() => {
    // refetch dashboard
    refetch.dashboard();
    // refetch teams
    refetch.teams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueSelected]);

  useEffect(() => {
    // reftch current match
    refetch.matchInView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard?.currentMatch]);

  const updateView = async (view) => {
    const { _id: leagueId } = leagueSelected;
    await dashboardService.updateDashboard({ leagueId, view });
    setDashboard({ ...dashboard, view });
  };

  const updateLeagueSelected = (league) => {
    setLeagueSelected(league);
  };

  return {
    leagueInView: store.leagueInView,
    leagueSelected,
    view: dashboard?.view,
    teams,
    matchInView,
    updateView,
    updateLeagueSelected,
  };
};

export default useDashboard;
