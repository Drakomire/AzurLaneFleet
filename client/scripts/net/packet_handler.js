// //Start websocket
// var connected = false;
// var siteLoaded = false;

// console.log(location.host)

// var client = null;
// if (location.host ==  'localhost:3000'){
//   client = new ReconnectingWebSocket('ws://'+location.host+'/socketserver');
// }else{
//   client = new ReconnectingWebSocket('wss://'+location.host+'/socketserver');
// }

// var TOKEN = ''
// client.onmessage = function (event) {
//   let data = JSON.parse(event.data);
//   let result = {
//     'TOKEN' : ()=>{
//         TOKEN = data.payload;
//         if (!siteLoaded){
//           initial();
//           siteLoaded = true;
//         }
//     },
//     'Fleet Data' : ()=>{
//       parseIdData(JSON.parse(data.payload));
//     },
//     'Fleet URL' : ()=>{
//       let fleetJson = JSON.parse(event.data);
//       let url = fleetJson.payload;
//       let textbox = document.getElementById("fleetdata");
//       textbox.value = "https://azurfleetmaker.com/?fleet="+data.payload;
//     },
//     'Ship Data' : (payload)=>{
//       ship_data[payload.id] = payload

//       print(payload.id)
//       print(ship_data[payload.id])
//     }
//   }[data.type];

//   console.log(data)
//   console.log(result)
//   result(data.payload);

// }

// client.onopen = async () => {
//   connected = true;
//   console.log('WebSocket Client Connected');
// }
