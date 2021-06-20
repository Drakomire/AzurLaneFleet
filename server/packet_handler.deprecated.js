fs = require('fs')
const ship_data = JSON.parse(fs.readFileSync('./data/ship_data.json',
            {encoding:'utf8', flag:'r'}));

module.exports ={
  TOKEN : process.env.WEBSOCKET_TOKEN,
  packetHandler : (socket,message)=>{
      message = JSON.parse(message);
      let type = message.type;
      let token = message.token;
      if (token == process.env.WEBSOCKET_TOKEN){
        // console.log("Valid packet")
      }else{
        // console.log("invalid packet");
        return;
      }

      let result = {
        "Fleet URL Load" : async (payload) => {
          let data = await global.database.get(payload);
          if (data == null) return;
          return {
            type: "Fleet Data",
            payload: data.data
          };

        },

        "Fleet URL Request" : async (payload) => {
          let data = payload;
          //Generate the key
          let key = '';
          for (let i = 0; i<6; i++){
            let letterPool = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            '1','2','3','4','5','6','7','8','9','0'
          ];
            let letter = letterPool[Math.floor(Math.random()*letterPool.length)];
            key+=letter;
          }

          //Turn off the database while testing
          key = "\tDatabase disabled. Uncomment in packet_handler.js"
          // await global.database.send(key, JSON.stringify(data));
          return {
            type: "Fleet URL",
            payload: key
          };
        },
        "Ship Data Request" : async (payload) => {
          console.log(payload)

          return {
            type : "Ship Data",
            payload : ship_data[payload]
          }

        },
        "ping" : () => {console.log("ping")}
      }[type];

      try{
        socket.send(JSON.stringify(result(message.payload)));
      }catch{
        console.log("Invalid Packet Sent");
      }

    // }
  }
}
