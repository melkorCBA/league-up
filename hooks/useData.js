import { useEffect, useState } from "react";
import client from "../pusher/client";
import { CHANNELS, EVENTS } from "../pusher/constants";
import axios from "axios";
import { ENVIRONMENT } from "../lib/util";

const useData = (initialData) => {
  const [data, setData] = useState(initialData);

  const reFeatchTeams = async () => {
    const response = await axios.get(`${ENVIRONMENT().BaseApiURL}/teams`);
    const { data } = response.data;
    setData(data);
  };

  useEffect(() => {
    const pusherClient = client();
    const channel = pusherClient.subscribeTochannel(CHANNELS.STANDING_BOARD);
    pusherClient.subscribeToEvent(
      channel,
      EVENTS.UPDATE_TEAMS,
      async (data) => {
        // refetch data
        console.log("team updated event recevied");
        await reFeatchTeams();
      }
    );
    return () => {
      pusherClient.unsubscribeToEvent(channel, "updateTeams");
    };
  }, []);

  return data;
};

export default useData;
