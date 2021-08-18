const fs = require('fs');
const express = require('express');
const ws = require('ws')
let ejs = require('ejs')
const {Database} = require('./server/database.js')
const {packetHandler} = require('./server/packet_handler.deprecated.js')
const {imageGenerator} = require('./server/image_generator.js')
const {TOKEN} = require('./server/packet_handler.deprecated.js')
const html = require('./server/vue_objects.js')

;(async () => {
  global.database = await Database.build();
})();

//Open the ship data json
// ship_json = JSON.parse(fs.readFileSync('./data/ships.json').toString())

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./server/request/index.js')(app)

//Here we are configuring express to use body-parser as middle-ware.
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
      fleet_popup_menu:html.ship_popup_html,
      equip_popup_menu:html.equip_popup_html
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