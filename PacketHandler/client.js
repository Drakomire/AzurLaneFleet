//Start websocket
var connected = false;
var siteLoaded = false;
const client = new ReconnectingWebSocket('wss://'+location.host+'/socketserver');
var TOKEN = ''
client.onmessage = function (event) {
  let data = JSON.parse(event.data);
  let result = {
    'TOKEN' : ()=>{
        TOKEN = data.payload;
        if (!siteLoaded){
          initial();
          siteLoaded = true;
        }
    },
    'Fleet Data' : ()=>{
      parseIdData(JSON.parse(data.payload));
    },
    'Fleet URL' : ()=>{
      let fleetJson = JSON.parse(event.data);
      let url = fleetJson.payload;
      let textbox = document.getElementById("fleetdata");
      textbox.value = "https://www.azurfleetmaker.com/?fleet="+data.payload;
    }
  }[data.type];
  result();

}

client.onopen = async () => {
  connected = true;
  console.log('WebSocket Client Connected');
}
