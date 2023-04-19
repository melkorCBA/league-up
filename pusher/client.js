import Pusher from "pusher-js";
import { ENVIRONMENT } from "../lib/util";

const getPusher = () =>
  new Pusher(ENVIRONMENT().PusherApiKey, {
    cluster: "ap2",
    encrypted: false,
  });

const onEvent = (channel, eventName, callback) => {
  channel.bind(eventName, () => {
    console.log(eventName);
    callback();
  });
};

const subscribeTochannel = (channelName) => getPusher().subscribe(channelName);
// const subscribeToEvent = (channel, eventName, callback) =>
//   channel.bind(eventName, callback);
const subscribeToEvent = onEvent;
const unsubscribeToEvent = (channel, eventName) => channel.unbind(eventName);

export default function client() {
  return {
    subscribeTochannel,
    subscribeToEvent,
    unsubscribeToEvent,
  };
}
