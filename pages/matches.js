import React, { useState, useEffect } from "react";
import Match from "../components/UpdateMatch";
import NewMatch from "../components/newMatch";
import styles from "../styles/Home.module.css";
import {
  ENVIRONMENT,
  CLIENT_ENVIRONMENT,
  setClientenvsInSession,
} from "../lib/util";
import MatchesCardList from "../components/MatchesCardList";
import useMatch from "../hooks/useMatch";
import useCurrentMatch from "../hooks/useCurrentMatch";
import { axiosClient } from "../lib/apiClient";

export default function Matches({
  initalTeamsData,
  league,
  clientenvs,
  initalmatchesData,
  initalDashboard,
}) {
  const { matches, addNewMatch } = useMatch(initalmatchesData);
  const { currentMatch: initialCurrentMatchId } = initalDashboard;
  const { currentMatchId, changeCurrentMatch } = useCurrentMatch(
    initialCurrentMatchId
  );
  useEffect(() => {
    // add envs to session
    setClientenvsInSession(clientenvs);
  }, []);
  return (
    <div className={styles.container}>
      <h1 className="text-center mt-5">Matches</h1>
      <h2 className="text-center mt-1">{league.name}</h2>
      <NewMatch addNewMatch={addNewMatch} teams={initalTeamsData} />
      <MatchesCardList
        matches={matches}
        currentMatchId={currentMatchId}
        updateCurrentMatch={changeCurrentMatch}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const envs = CLIENT_ENVIRONMENT;
  const axios = axiosClient(context.req);

  const teamsResponse = await axios.get(`api/teams`);
  const matchesResponse = await axios.get(`api/matches`);
  const leagueResponse = await axios.get(`api/leagues`);
  const dashboardResponse = await axios.get(`api/dashboard`);
  const initalTeamsData = await teamsResponse["data"];
  const initalmatchesData = await matchesResponse["data"];
  const leagues = await leagueResponse["data"];
  const initalDashboardData = await dashboardResponse["data"];
  // Pass data to the page via props
  return {
    props: {
      initalTeamsData: initalTeamsData["data"],
      initalmatchesData: initalmatchesData["data"],
      initalDashboard: initalDashboardData["data"],
      league: leagues["data"],
      clientenvs: envs,
    },
  };
}
