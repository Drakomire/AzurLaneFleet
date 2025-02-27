const fs = require('fs');
const express = require('express');
const ws = require('ws');

const {Database} = require('./database/database.js');
const {packetHandler} = require('./PacketHandler/server.js');
const {TOKEN} = require('./PacketHandler/server.js');

async function a(){
  global.database = await Database.build();
}a();


const app = express();
app.use(express.static(__dirname));
app.get('/', function(request, response){
    response.sendFile(__dirname+'/index.html');
});

console.log("Server is up");

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ server: app });
wsServer.on('connection', socket => {
    socket.send(JSON.stringify({
      type: "TOKEN",
      payload: TOKEN
    }));
  socket.on('message', async message => {
    packetHandler(socket,message);



  });
});
