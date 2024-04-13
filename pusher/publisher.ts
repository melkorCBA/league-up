import Pusher from "pusher";
import { ENVIRONMENT } from "../lib/util";
import {  PusherChannel, PusherEvent } from "./constants";

export const getPublisher = () => {
  return new Pusher({
    appId: ENVIRONMENT().PusherAppId,
    key: ENVIRONMENT().PusherApiKey,
    secret: ENVIRONMENT().PusherSecret,
    cluster: "ap2", // need to move it to environment file
    useTLS: true,
  });
};
export const trigger = (
  publisher:Pusher,
  message: unknown,
  channelName?:PusherChannel,
  eventName?: PusherEvent,
  responseCallback?: (response: Pusher.Response) => void,
  errorCallback?: (err: unknown)=> void,
) => 
  publisher
    .trigger(
      channelName ?? <PusherChannel>'standings',
      eventName ?? <PusherEvent>'TEAM_updateTeams',
      {
        message: message ?? "",
      }
    )
    .then((res) => {
      if(responseCallback)
        responseCallback(res);
      //console.log("event:" + eventName ?? <PusherEvent>'TEAM_updateTeams');
    })
    .catch((err) => (errorCallback ? errorCallback(err) : console.log(err)));
