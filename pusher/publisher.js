import Pusher from "pusher";
import { ENVIRONMENT } from "../lib/util";
import { CHANNELS, EVENTS } from "./constants";

export const getPublisher = () => {
  return new Pusher({
    appId: ENVIRONMENT().PusherAppId,
    key: ENVIRONMENT().PusherApiKey,
    secret: ENVIRONMENT().PusherSecret,
    cluster: "ap2",
    useTLS: true,
  });
};
export const trigger = (
  publisher,
  { channelName, eventName, message, errorCallback } = {}
) =>
  publisher
    .trigger(
      channelName ?? CHANNELS.STANDINGS,
      eventName ?? EVENTS.UPDATE_TEAMS,
      {
        message: message ?? "",
      }
    )
    .then((res) => {
      console.log("event:" + eventName ?? EVENTS.UPDATE_TEAMS);
    })
    .catch((err) => (errorCallback ? errorCallback(err) : console.log(err)));
