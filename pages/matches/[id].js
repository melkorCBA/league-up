import React, { useEffect } from "react";
import {
  ENVIRONMENT,
  CLIENT_ENVIRONMENT,
  setClientenvsInSession,
} from "../../lib/util";
import UpdateMatch from "../../components/UpdateMatch";
import useUpdateMatch from "../../hooks/useUpdateMatch";

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

  // Fetch data from external API
  const envs = CLIENT_ENVIRONMENT;

  try {
    const matcheResponse = await fetch(
      `${ENVIRONMENT.BaseApiURL}/matches/${id}`
    );
    if (!matcheResponse.ok) throw new Error(matcheResponse.json()["message"]);
    const leagueResponse = await fetch(`${ENVIRONMENT.BaseApiURL}/league`);

    const matcheData = await matcheResponse.json();
    const leagues = await leagueResponse.json();
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
