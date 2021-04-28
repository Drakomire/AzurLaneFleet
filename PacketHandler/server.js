module.exports ={
  TOKEN : process.env.WEBSOCKET_TOKEN,
  packetHandler : (socket,message)=>{
      message = JSON.parse(message);
      let type = message.type;
      let token = message.token;
      if (token == process.env.WEBSOCKET_TOKEN){
        console.log("Valid packet")
      }else{
        console.log("invalid packet");
        return;
      }

      let result = {
        "Fleet URL Load" : async () => {
          let data = await global.database.get(message.payload);
          socket.send(JSON.stringify({
            type: "Fleet Data",
            payload: data.data
          }));

        },

        "Fleet URL Request" : async () => {
          let data = message.payload;
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

          await global.database.send(key, JSON.stringify(data));
          socket.send(JSON.stringify({
            type: "Fleet URL",
            payload: key
          }));
        },
        "ping" : () => {console.log("ping")}
      }[type];

      try{
        result();
      }catch{
        console.log("Invalid Packet Sent");
      }

    // }
  }
}
