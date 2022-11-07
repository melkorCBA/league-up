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

export default function Matches({
  initalTeamsData,
  league,
  clientenvs,
  initalmatchesData,
}) {
  const { matches, addNewMatch } = useMatch(initalmatchesData);
  useEffect(() => {
    // add envs to session
    setClientenvsInSession(clientenvs);
  }, []);
  return (
    <div className={styles.container}>
      <h1 className="text-center mt-5">Matches</h1>
      <h2 className="text-center mt-1">{league.name}</h2>
      <NewMatch addNewMatch={addNewMatch} teams={initalTeamsData} />
      <MatchesCardList matches={matches} />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const envs = CLIENT_ENVIRONMENT;

  const teamsResponse = await fetch(`${ENVIRONMENT.BaseApiURL}/teams`);
  const matchesResponse = await fetch(`${ENVIRONMENT.BaseApiURL}/matches`);
  const leagueResponse = await fetch(`${ENVIRONMENT.BaseApiURL}/league`);
  const initalTeamsData = await teamsResponse.json();
  const initalmatchesData = await matchesResponse.json();
  const leagues = await leagueResponse.json();
  // Pass data to the page via props
  return {
    props: {
      initalTeamsData: initalTeamsData["data"],
      initalmatchesData: initalmatchesData["data"],
      league: leagues["data"][0],
      clientenvs: envs,
    },
  };
}
