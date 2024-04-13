import { useEffect, useState } from "react";
import client from "../pusher/client";
import axios from "axios";
import { ENVIRONMENT } from "../lib/util";

const useData = (initialData) => {
  const [data, setData] = useState(initialData);

  const reFetchTeams = async () => {
    const response = await axios.get(`${ENVIRONMENT().BaseApiURL}/teams`);
    const { data } = response.data;
    setData(data);
  };

  useEffect(() => {
    const pusherClient = client();
    const channel = pusherClient.subscribeChannel('standings');
    pusherClient.subscribeToEvent(
      channel,
      'TEAM_updateTeams',
      async () => {
        // refetch data
        console.log("team updated event received");
        await reFetchTeams();
      }
    );
    return () => {
      pusherClient.unsubscribeToEvent(channel, "TEAM_updateTeams");
    };
  }, []);

  return data;
};

export default useData;
