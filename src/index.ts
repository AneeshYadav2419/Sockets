import {  WebSocketServer  } from "ws";

const wss = new WebSocketServer ({port : 8000});
let userCount = 0;

wss.on("connection" ,(socket) => {
    userCount = userCount + 1;
    console.log("USER connection is #" + userCount);

    socket.on("message", (message) => {
        console.log("Message recieved" + message.toString())

        setTimeout(() => {
            socket.send(message.toString() + ":send from the server");
        }, 1000);
    })
})
