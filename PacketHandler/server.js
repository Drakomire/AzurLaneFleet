module.exports ={
  packetHandler : (socket,message)=>{
    console.log("socket handle")

    // try{
      message = JSON.parse(message);
      let type = message.type;


      let result = {
        "Fleet URL Load" : async () => {
          try{
            let data = await global.database.get(message.payload);
            socket.send(JSON.stringify({
              type: "Fleet Data",
              payload: data.data
            }));
          }catch{

          }

        },

        "Fleet URL Request" : async () => {
          let data = message.payload;
          //Generate the key
          let key = '';
          for (let i = 0; i<6; i++){
            let letterPool = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
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

      result();
    // }
  }
}
