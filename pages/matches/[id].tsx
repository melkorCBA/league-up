import React, { useEffect } from "react";
import {
  ENVIRONMENT,
  CLIENT_ENVIRONMENT,
  setClientenvsInSession,
} from "../../lib/util";
import UpdateMatch from "../../components/UpdateMatch";
import useUpdateMatch from "../../hooks/useUpdateMatch";
import { axiosClient } from "../../services/apiClients/api.client";

export default function Match({ initalMatcheData, league, clientenvs }) {
  const { match, updateMatch } = useUpdateMatch(initalMatcheData);
  useEffect(() => {
    // add envs to session
    setClientenvsInSession(clientenvs);
  }, []);
  return (
    <div>
      <UpdateMatch league={league} match={match} updateMatch={updateMatch} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const axios = axiosClient(ctx.req);
  // Fetch data from external API
  const envs = CLIENT_ENVIRONMENT;

  try {
    const matchResponse = await axios.get(`api/matches/${id}`);
    if (matchResponse.status !== 200)
      throw new Error(matchResponse["message"]);
    const leagueResponse = await axios.get(`api/leagues`);

    const matchData = await matchResponse["data"];
    const leagues = await leagueResponse["data"];
    // Pass data to the page via props
    return {
      props: {
        initalMatcheData: matchData["data"],
        league: leagues["data"],
        clientenvs: envs,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
        basePath: false,
      },
    };
  }
}
