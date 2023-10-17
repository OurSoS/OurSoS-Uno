const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1679637",
  key: "6f1a52f9cd193f4d55c7",
  secret: "63a623e123adf5ae7d11",
  cluster: "us3",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
