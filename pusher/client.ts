import Pusher, { Channel } from "pusher-js";
import { ENVIRONMENT } from "../lib/util";
import { PusherChannel, PusherEvent } from "./constants";


const getPusher = () =>
  new Pusher(ENVIRONMENT().PusherApiKey, {
    cluster: "ap2"
  });

const onEvent = (channel:Channel, eventName:PusherEvent,  callback: ()=>void) => {
  channel.bind(eventName, () => {
    console.log(eventName);
    callback();
  });
};

const subscribeChannel: (channelName:PusherChannel)=>Channel = (channelName:PusherChannel) => getPusher().subscribe(channelName);
const subscribeToEvent = onEvent;
const unsubscribeToEvent = (channel:Channel, eventName:PusherEvent) => channel.unbind(eventName);

export default function client() {
  return {
    subscribeChannel,
    subscribeToEvent,
    unsubscribeToEvent,
  };
}
