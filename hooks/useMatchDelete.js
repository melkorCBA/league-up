import { useEffect, useState } from "react";
import { useError } from "../contexts/errorContext";
import { ENVIRONMENT } from "../lib/util";
import axios from "axios";

const useDeleteMatch = (initalMatcheData) => {
  const [match, setMatch] = useState(initalMatcheData);
  const { setErrors, setSuccess } = useError();

  const updateMatch = async (status) => {
    setMatch({ ...match, isDeleted: status });
    const URL = `${ENVIRONMENT.BaseApiURL}/matches/${match["_id"]}`;
    try {
      const payload = {
        isDeleted: status,
      };

      await axios.patch(URL, payload);
      setSuccess("match status updated");
      await reFeatchMatch(match["_id"]);
    } catch (err) {
      setMatch({ ...match, isDeleted: !status });
      setErrors([err["message"]]);
    }
  };

  const reFeatchMatch = async (matchId) => {
    try {
      const response = await axios.get(
        `${ENVIRONMENT.BaseApiURL}/matches/${matchId}`
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

export default useDeleteMatch;
