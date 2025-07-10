"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
let userCount = 0;
wss.on("connection", (socket) => {
    userCount = userCount + 1;
    console.log("USER connection is #" + userCount);
    socket.on("message", (message) => {
        console.log("Message recieved" + message.toString());
        setTimeout(() => {
            socket.send(message.toString() + ":send from the server");
        }, 1000);
    });
});
