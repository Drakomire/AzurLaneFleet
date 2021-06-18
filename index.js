const fs = require('fs');
const express = require('express');
const ws = require('ws')
let ejs = require('ejs')
const path = require('path')

const {Database} = require('./server/database.js')
const {packetHandler} = require('./server/packet_handler.js')
const {imageGenerator} = require('./server/image_generator.js')
const {TOKEN} = require('./server/packet_handler.js')
const { req } = require('express')

;(async () => {
  global.database = await Database.build();
})();

const app = express();
const Vue = require('vue')
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/client'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    fleet_id = req.query.fleet
    if (fleet_id === undefined){
      fleet_id = "None"
    }
    //Image file location is set in the HTML for dynamic images to work.
    res.render(__dirname+'/index.html',{
      fleet_id:fleet_id,
      fleet_container:"TEST"
    
    });
});

//Render a request for an image
app.get('/images/*', async function(req, res){
  let fleetID = req.params[0]
  let fleetData = await global.database.get(fleetID)
  if (fleetData == undefined){
    res.send("Invalid fleet ID!")
    return;
  }
  fleetData = JSON.parse(JSON.parse(fleetData.data))
  imageGenerator(fleetData, (image) => {
    res.sendFile(image, {}, () => {
      fs.unlink(image, (err) => {
      })
    })
  })


});

console.log("Server is up");

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);
server.on('upgrade', (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, socket => {
    wsServer.emit('connection', socket, req);
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
