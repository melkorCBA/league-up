import { useEffect, useState } from "react";
import { getHashMap } from "../lib/util";
import { useError } from "../contexts/errorContext";
import { ENVIRONMENT } from "../lib/util";
import axios from "axios";

const useMatch = (initalMatches) => {
  const [matches, setMatches] = useState(initalMatches);
  const hMap = getHashMap(initalMatches, "_id");
  const [matchesMap, setMatchesMap] = useState(hMap);
  const { setErrors, setSuccess } = useError();

  useEffect(() => {
    setMatchesMap(getHashMap(matches, "_id"));
  }, [initalMatches, matches]);

  const addNewMatch = async (teams) => {
    const URL = `${ENVIRONMENT.BaseApiURL}/matches`;
    try {
      const payload = {
        team1Id: teams[0]._id,
        team2Id: teams[1]._id,
      };

      await axios.post(URL, payload);
      setSuccess("match added");
      await reFeatchMatches();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const updateMatch = async (matchId, matchToUpdate) => {
    const URL = `${ENVIRONMENT.BaseApiURL}/matches/${matchId}`;
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
      await reFeatchMatches();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const reFeatchMatches = async () => {
    try {
      const response = await axios.get(`${ENVIRONMENT.BaseApiURL}/matches`);
      const { data } = response.data;
      setMatches(data);
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  return {
    matches,
    matchesMap,
    addNewMatch,
  };
};

export default useMatch;
