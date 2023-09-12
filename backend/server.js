const express = require("express");
const app = express();

const server = require("http").createServer(app);

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// server-side
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("What is Socket: ", socket);
  console.log("Socket is active to be connected");

  socket.on("chat", (payload) => {
    //console.log("what is payload", payload);
    io.emit("chat", payload);
  });
});

//app.listen(5000, () => console.log("Server is active..."));

server.listen(8000, () => console.log("Server is active at 8000..."));
