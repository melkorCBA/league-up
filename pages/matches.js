import React, { useState, useEffect } from "react";
import NewMatch from "../components/newMatch";
import styles from "../styles/Home.module.css";
import { CLIENT_ENVIRONMENT, setClientenvsInSession } from "../lib/util";
import MatchesCardList from "../components/MatchesCardList";
import useMatch from "../hooks/useMatch";
import { axiosClient } from "../lib/apiClient";
import {
  dashboardService,
  leagueService,
  matchService,
  teamService,
  userService,
} from "../services/api-service";

export default function Matches({
  teams,
  league,
  clientenvs,
  initalMatches,
  initialMatchInViewId,
}) {
  const { matches, addNewMatch } = useMatch(initalMatches, league);
  const initialMatchInView = initalMatches.find(
    (m) => m._id === initialMatchInViewId
  );
  const [matchInView, setMatchInView] = useState(initialMatchInView);
  const updateMatchInView = async (matchId) => {
    const { _id: leagueId } = league;
    try {
      if (!leagueId || !matchId) {
        return;
      }
      await dashboardService.updateDashboard({
        leagueId,
        currentMatch: matchId,
      });
      const match = matches.find((m) => m._id === matchId);
      setMatchInView(match);
    } catch (err) {}
  };
  useEffect(() => {
    // add envs to session
    setClientenvsInSession(clientenvs);
  }, []);
  return (
    <div className={styles.container}>
      <h1 className="text-center mt-5">Matches</h1>
      <h2 className="text-center mt-1">{league.name}</h2>
      <NewMatch addNewMatch={addNewMatch} teams={teams} />
      <MatchesCardList
        matches={matches}
        currentMatchId={matchInView?._id}
        updateCurrentMatch={updateMatchInView}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const envs = CLIENT_ENVIRONMENT;
  const axios = axiosClient(context.req);
  let { leagueId } = context.query;

  if (!leagueId) {
    const userDashboard = await userService.getUserDashboard(axios);
    leagueId = userDashboard.league;
  }

  const teams = await teamService.getTeams({ leagueId }, axios);
  const matches = await matchService.getMatchesForLeague(leagueId, axios);
  const dashboard = await dashboardService.getDashboard({ leagueId }, axios);
  const league = await leagueService.getLeague(leagueId, axios);

  // Pass data to the page via props
  return {
    props: {
      teams,
      initalMatches: matches,
      initialMatchInViewId: dashboard.currentMatch,
      league,
      clientenvs: envs,
    },
  };
}
