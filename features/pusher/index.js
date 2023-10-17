const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1679634",
  key: "97a21170af649df48ccb",
  secret: "826cfca4cdba50fd7eb3",
  cluster: "us3",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
