var express = require("express");
var app = express();
const helmet = require("helmet");
const cors = require("cors");
app.use(cors());
app.use(helmet());
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  cors: true,
  origins: ["http://localhost:3000"],
});
const PORT = process.env.PORT || 3001;
const STATIC_CHANNELS = ["global_notifications", "global_chat"];
const messages = [];
server.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

app.get("/getChannels", (req, res) => {
  res.json({
    channels: STATIC_CHANNELS,
  });
});

app.get("/getMessages", (req, res) => {
  res.json({
    messages,
  });
});

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log("new client connected");
  socket.emit("connection", null);
  socket.on("receivedMessage", (message) => {
    console.log("JUST UPDATED BACKEND MESSAGES WITH: ", message);
    messages.push(message);
    console.log(messages);
    io.sockets.emit("updatedMessages", messages);
  });
});
