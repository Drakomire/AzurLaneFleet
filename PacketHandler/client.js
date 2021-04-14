//Start websocket
var connected = false;
const client = new ReconnectingWebSocket('ws://'+location.host+'/socketserver');
var TOKEN = ''
client.onmessage = function (event) {
  let data = JSON.parse(event.data);
  let result = {
    'TOKEN' : ()=>{
        TOKEN = data.payload;
        console.log("token recieved")
        initial();
    },
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

client.onopen = async () => {
  connected = true;
  console.log('WebSocket Client Connected');
}
