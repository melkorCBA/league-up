import React, { useEffect } from "react";
import {
  ENVIRONMENT,
  CLIENT_ENVIRONMENT,
  setClientenvsInSession,
} from "../../lib/util";
import UpdateMatch from "../../components/UpdateMatch";
import useUpdateMatch from "../../hooks/useUpdateMatch";
import { axiosClient } from "../../lib/apiClient";

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
    const matcheResponse = await axios.get(`api/matches/${id}`);
    if (!matcheResponse.ok) throw new Error(matcheResponse.json()["message"]);
    const leagueResponse = await axios.get(`api/leagues`);

    const matcheData = await matcheResponse["data"];
    const leagues = await leagueResponse["data"];
    // Pass data to the page via props
    return {
      props: {
        initalMatcheData: matcheData["data"],
        league: leagues["data"],
        clientenvs: envs,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/notFound",
        basePath: false,
      },
    };
  }
}
