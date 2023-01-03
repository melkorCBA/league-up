import { useEffect, useState } from "react";
import { ENVIRONMENT } from "../lib/util";
import axios from "axios";

const useCurrentMatch = (initalCurrentMatchId) => {
  const [currentMatchId, setCurrentMatchId] = useState(initalCurrentMatchId);

  //   const getCurrentMatchId = async () => {
  //     const response = await axios.get(`${ENVIRONMENT.BaseApiURL}/dashboard`);
  //     const { data } = response.data;
  //     const { currentMatch: matchId } = data;
  //     return matchId;
  //   };

  const updateCurrentMatch = async () => {
    const response = await axios.patch(`${ENVIRONMENT.BaseApiURL}/dashboard`, {
      currentMatch: currentMatchId,
    });
  };

  useEffect(() => {
    updateCurrentMatch();
  }, [currentMatchId]);

  return {
    currentMatchId,
    changeCurrentMatch: setCurrentMatchId,
  };
};

export default useCurrentMatch;
