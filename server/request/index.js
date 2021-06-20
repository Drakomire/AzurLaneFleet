fs = require('fs')
const ship_data = JSON.parse(fs.readFileSync('./data/ship_data.json',{encoding:'utf8', flag:'r'}));

module.exports = (app) => {
    app.post('/fleet',async (req,res) => {
        let data = req.body;
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
        key = "\tDatabase disabled. Uncomment in request/index.js"
        // await global.database.send(key, JSON.stringify(data));
        res.send(key)
      
    });
    app.post('/fleet_url_load',async (req,res) => {
        url = req.body
        let data = await global.database.get(url);
        res.send(JSON.stringify(data))
    });
    app.get('/ship_data',(req,res) => {
      res.send(JSON.stringify(ship_data[req.query.id]))
    });
}