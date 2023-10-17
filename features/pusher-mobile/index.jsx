import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from "@pusher/pusher-websocket-react-native";

const pusher = Pusher.getInstance();

await pusher.init({
  apiKey: "6f1a52f9cd193f4d55c7",
  cluster: "us3",
});

await pusher.connect();
await pusher.subscribe({
  channelName: "my-channel",
  onEvent: (event) => {
    console.log(`Event received: ${event}`);
  },
});
