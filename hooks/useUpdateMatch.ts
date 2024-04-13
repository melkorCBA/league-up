import { useEffect, useState } from "react";
import { useError } from "../contexts/errorContext";
import { ENVIRONMENT } from "../lib/util";
import axios from "axios";

const useUpdateMatch = (initalMatcheData) => {
  const [match, setMatch] = useState(initalMatcheData);
  const { setErrors, setSuccess } = useError();

  const updateMatch = async (matchId, matchToUpdate) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/matches/${matchId}`;
    try {
      const payload = {
        team1: {
          runs: matchToUpdate["team1"].runs,
          wickets: matchToUpdate["team1"].wickets,
          overs: matchToUpdate["team1"].overs,
        },
        team2: {
          runs: matchToUpdate["team2"].runs,
          wickets: matchToUpdate["team2"].wickets,
          overs: matchToUpdate["team2"].overs,
        },
        toss: "" + matchToUpdate["toss"],
        bat1st: "" + matchToUpdate["bat1st"],
        won: "" + matchToUpdate["won"],
        isSynced: matchToUpdate["isSynced"],
        lockedForSync: matchToUpdate["lockedForSync"],
        winMargin: "" + matchToUpdate["winMargin"],
      };

      await axios.patch(URL, payload);
      setSuccess("match updated");
      await reFeatchMatch(matchId);
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const reFeatchMatch = async (matchId) => {
    try {
      const response = await axios.get(
        `${ENVIRONMENT().BaseApiURL}/matches/${matchId}`
      );
      const { data } = response.data;
      setMatch(data);
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  return {
    match,
    updateMatch,
  };
};

export default useUpdateMatch;
