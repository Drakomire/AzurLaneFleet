//Start websocket
var connected = false;
const client = new WebSocket('ws://'+location.host);
client.onmessage = function (event) {
  let data = JSON.parse(event.data);
  let result = {
    'Fleet Data' : ()=>{
      parseIdData(JSON.parse(data.payload));
    },
    'Fleet URL' : ()=>{
      let fleetJson = JSON.parse(event.data);
      let url = fleetJson.payload;
      let textbox = document.getElementById("fleetdata");
      textbox.value = "http://azur-fleet-maker.herokuapp.com/?fleet="+data.payload;
    }
  }[data.type];
  result();

}

client.onopen = () => {
  connected = true;
  console.log('WebSocket Client Connected');
}
