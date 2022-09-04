import { useEffect, useState } from "react";
import client from "../pusher/client";
import axios from "axios";
import { ENVIRONMENT } from "../lib/util";

const useData = (initialData) => {
  const [data, setData] = useState(initialData);

  const reFeatchTeams = async () => {
    const response = await axios.get(`${ENVIRONMENT.BaseApiURL}/teams`);
    const { data } = response.data;
    setData(data);
  };

  useEffect(() => {
    const pusherClient = client();
    const channel = pusherClient.subscribeTochannel("standings-board");
    pusherClient.subscribeToEvent(channel, "updateTeams", async (data) => {
      // refetch data
      console.log("team updated event recevied");
      await reFeatchTeams();
    });
    return () => {
      pusherClient.unsubscribeToEvent(channel, "updateTeams");
    };
  }, []);

  return data;
};

export default useData;
