import Pusher from "pusher-js";
import { ENVIRONMENT } from "../lib/util";

const getPusher = () =>
  new Pusher(ENVIRONMENT.PusherAPIKey, {
    cluster: "ap2",
    encrypted: false,
  });

const subscribeTochannel = (channelName) => getPusher().subscribe(channelName);
const subscribeToEvent = (channel, eventName, callback) =>
  channel.bind(eventName, callback);
const unsubscribeToEvent = (channel, eventName) => channel.unbind(eventName);

export default function client() {
  return {
    subscribeTochannel,
    subscribeToEvent,
    unsubscribeToEvent,
  };
}
