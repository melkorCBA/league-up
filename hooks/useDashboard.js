import { useEffect, useState, useRef } from "react";
import client from "../pusher/client";
import { CHANNELS, EVENTS } from "../pusher/constants";
import { ENVIRONMENT, CONSTANTS, setClientenvsInSession } from "../lib/util";
import axios from "axios";

const useDashboard = ({
  initalDashboard,
  clientenvs,
  league,
  initalTeamsData,
}) => {
  const [dashboard, setDashboard] = useState(initalDashboard);
  const [currentMatch, setCurrentMatch] = useState({});
  const [teams, setTeams] = useState(initalTeamsData);

  const isIntialRenderCycle = (state) => {
    return initalDashboard[state] === dashboard[state];
  };

  const refetchDashboard = async () => {
    const { league: leagueId } = dashboard;
    const response = await axios.get(
      `${ENVIRONMENT.BaseApiURL}/dashboard?leagueId=${leagueId}`
    );
    const { data } = response.data;
    setDashboard(data);
    await dahsboardSwitch(data);
  };

  const reFeatchTeams = async () => {
    const { league: leagueId } = dashboard;
    const response = await axios.get(
      `${ENVIRONMENT.BaseApiURL}/teams?leagueId=${leagueId}`
    );
    const { data } = response.data;
    setTeams(data);
  };

  const reFetchCurrentMatch = async () => {
    const currentMatchId = dashboard["currentMatch"];
    const response = await axios.get(
      `${ENVIRONMENT.BaseApiURL}/matches/${currentMatchId}`
    );
    const { data } = response.data;
    setCurrentMatch(data);
  };

  const dahsboardSwitch = async ({ view }) => {
    switch (view) {
      case CONSTANTS.VIEWS.STANDINGS:
        await reFeatchTeams();
        break;
      case CONSTANTS.VIEWS.MATCH_VIEWS.PRE_MATCH:
      case CONSTANTS.VIEWS.MATCH_VIEWS.ON_MATCH:
      case CONSTANTS.VIEWS.MATCH_VIEWS.POST_MATCH:
        await reFetchCurrentMatch();
    }
  };

  const updateView = (view) => {
    setDashboard({ ...dashboard, view });
    // await updateDashboadView(view);
    // await dahsboardSwitch({ view });
  };
  const updateDashboadView = async (view) => {
    const { league: leagueId } = dashboard;
    const response = await axios.patch(`${ENVIRONMENT.BaseApiURL}/dashboard/`, {
      view,
      currentMatch: dashboard["currentMatch"],
      leagueId,
    });
  };

  const updateCurrentMatch = async ({ matchId }) => {
    const { league: leagueId } = dashboard;
    const response = await axios.patch(`${ENVIRONMENT.BaseApiURL}/dashboard/`, {
      view: dashboard["view"],
      currentMatch: matchId,
      leagueId,
    });
    setDashboard({ ...dashboard, currentMatch: matchId });
  };

  const updateLeague = async (league) => {
    const response = await axios.patch(`${ENVIRONMENT.BaseApiURL}/dashboard/`, {
      view: dashboard["view"],
      currentMatch: dashboard["currentMatch"],
      leagueId: league["_id"],
    });
    setDashboard({ ...dashboard, league: league["_id"] });
  };

  useEffect(() => {
    if (dashboard.league === league["_id"]) return;
    updateLeague(league);
  }, [league]);

  useEffect(() => {
    if (!isIntialRenderCycle("league")) {
      reFeatchTeams();
    }
  }, [dashboard.league]);

  useEffect(() => {
    if (!isIntialRenderCycle("view")) {
      updateDashboadView(dashboard.view);
      dahsboardSwitch(dashboard);
    }
  }, [dashboard.view]);

  useEffect(() => {
    // if (!isIntialRenderCycle("currentMatch")) {
    //   reFetchCurrentMatch();
    // }
    reFetchCurrentMatch();
  }, [dashboard.currentMatch]);

  useEffect(() => {
    // add envs to session
    setClientenvsInSession(clientenvs);

    const pusherClient = client();
    const dashBoardChannel = pusherClient.subscribeTochannel(
      CHANNELS.DASHBOARD
    );

    const standingsBoardChannel = pusherClient.subscribeTochannel(
      CHANNELS.STANDING_BOARD
    );
    const currentMatchChannel = pusherClient.subscribeTochannel(
      CHANNELS.CURRENT_MATCH
    );

    (async () => {
      await dahsboardSwitch(initalDashboard);
    })();
    pusherClient.subscribeToEvent(
      dashBoardChannel,
      EVENTS.UPDATE_DASHBOARD,
      async (data) => {
        // refetch data
        console.log("dashBoard update event recevied");
        await refetchDashboard();
      }
    );
    pusherClient.subscribeToEvent(
      standingsBoardChannel,
      EVENTS.UPDATE_TEAMS,
      async (data) => {
        // refetch data
        console.log("standingsBoard team updated event recevied");

        if (dashboard["view"] === CONSTANTS.VIEWS.STANDINGS) {
          await reFeatchTeams();
        }
      }
    );
    pusherClient.subscribeToEvent(
      currentMatchChannel,
      EVENTS.UPDATE_MATCH,
      async (data) => {
        // refetch data
        console.log("current Match update event recevied");
        if (
          Object.values(CONSTANTS.VIEWS.MATCH_VIEWS).some(
            (v) => v === dashboard["view"]
          )
        ) {
          await reFetchCurrentMatch();
        }
      }
    );
  }, []);

  return {
    view: dashboard?.view,
    teams,
    currentMatch,
    updateView,
    updateCurrentMatch,
  };
};

export default useDashboard;
