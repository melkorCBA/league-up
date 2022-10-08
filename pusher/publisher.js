import Pusher from "pusher";
import { ENVIRONMENT } from "../lib/util";

export const getPublisher = () => {
  return new Pusher({
    appId: ENVIRONMENT.PusherAppId,
    key: ENVIRONMENT.PusherApiKey,
    secret: ENVIRONMENT.PusherSecret,
    cluster: "ap2",
    useTLS: true,
  });
};
export const trigger = (
  publisher,
  { channelName, eventName, message, errorCallback } = {}
) =>
  publisher
    .trigger(channelName ?? "standings-board", eventName ?? "updateTeams", {
      message: message ?? "",
    })
    .then((res) => {
      console.log("team update event published");
    })
    .catch((err) => (errorCallback ? errorCallback(err) : console.log(err)));
