import { useEffect, useState } from "react";
import client from "../pusher/client";
import { CHANNELS, EVENTS } from "../pusher/constants";
import { ENVIRONMENT, CONSTANTS, setClientenvsInSession } from "../lib/util";
import axios from "axios";

const useDashboard = ({ initalDashboard, clientenvs }) => {
  console.log(`initDashBoard: ${initalDashboard}`);
  const { view: initialview, currentMatch: initCurrentMatch } = initalDashboard;
  const [view, setView] = useState(initialview);
  const [currentMatchId, setCurrentMatchId] = useState(initCurrentMatch);

  const [teams, setTeams] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});

  const refetchDashboard = async () => {
    const response = await axios.get(`${ENVIRONMENT.BaseApiURL}/dashboard`);
    const { data } = response.data;
    const { view: v, currentMatch: m } = data;
    setView(v);
    setCurrentMatchId(m);
    await dahsboardSwitch({ view: v, currentMatchId: m });
  };

  const reFeatchTeams = async () => {
    const response = await axios.get(`${ENVIRONMENT.BaseApiURL}/teams`);
    const { data } = response.data;
    setTeams(data);
  };

  const reFetchCurrentMatch = async (currentMatchId) => {
    const response = await axios.get(
      `${ENVIRONMENT.BaseApiURL}/matches/${currentMatchId}`
    );
    const { data } = response.data;
    setCurrentMatch(data);
  };

  const reFetchCurrentMatchV2 = async (matchId) => {
    if (matchId) {
      const response = await axios.get(
        `${ENVIRONMENT.BaseApiURL}/matches/${matchId}`
      );
      const { data } = response.data;
      setCurrentMatch(data);
      return;
    }
  };

  const dahsboardSwitch = async ({ view, currentMatchId }) => {
    switch (view) {
      case CONSTANTS.VIEWS.STANDINGS:
        await reFeatchTeams();
        break;
      case CONSTANTS.VIEWS.MATCH_VIEWS.PRE_MATCH:
      case CONSTANTS.VIEWS.MATCH_VIEWS.ON_MATCH:
      case CONSTANTS.VIEWS.MATCH_VIEWS.POST_MATCH:
        await reFetchCurrentMatch(currentMatchId);
    }
  };

  const onViewSelectorChnage = async (view) => {
    await updateDashboadView(view);
    await dahsboardSwitch({ view, currentMatchId });
  };
  const updateDashboadView = async (view) => {
    const response = await axios.patch(`${ENVIRONMENT.BaseApiURL}/dashboard/`, {
      view,
      currentMatch: currentMatchId,
    });
  };

  const updateCurrentMatch = async ({ matchId }) => {
    setCurrentMatchId(matchId);
    const response = await axios.patch(`${ENVIRONMENT.BaseApiURL}/dashboard/`, {
      view,
      currentMatch: matchId,
    });
    await reFetchCurrentMatchV2(matchId);
  };

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
      await dahsboardSwitch({ view, currentMatchId });
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

        if (view === CONSTANTS.VIEWS.STANDINGS) {
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
          Object.values(CONSTANTS.VIEWS.MATCH_VIEWS).some((v) => v === view)
        ) {
          await reFetchCurrentMatch();
        }
      }
    );
  }, []);

  return {
    view,
    teams,
    currentMatch,
    onViewSelectorChnage,
    updateCurrentMatch,
  };
};

export default useDashboard;
