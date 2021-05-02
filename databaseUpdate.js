const {MongoClient} = require('mongodb');
const fs = require('fs');


let shipsOldID = null;
 fs.readFile('js/ship_data_numeric.json', (err, data) => {
     if (err) throw err;
     shipsOldID = JSON.parse(data);
 });

 let shipsNew = null;
  fs.readFile('js/ship_data.json', (err, data) => {
      if (err) throw err;
      shipsNew = JSON.parse(data);
  });


async function main() {
  const uri = process.env.URL_DB;
  const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try{
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");


    const database = client.db("urls");
    const urls = database.collection("urls");
    const query = {};

    const options = {
      // sort matched documents in descending order by rating
      sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      // projection: { _id: 0, title: 1, imdb: 1 },
    };

    let count = 0;
    await urls.find().forEach(async (fleet) =>{
      // if (count == 1){
      //   return;
      // }
      let data = JSON.parse(JSON.parse(fleet.data));
      count++;

      for (let i in data){
        data[i].forEach(space => {
          space.forEach(row => {
            let id = row[0];
            shipData = shipsOldID[id];
            if (shipData !== undefined){
              for (key in shipsNew){
                if (shipsNew[key].en_name == shipData.en_name){
                  row[0] = key;
                }
              }
            }
          });
        });
      }
      let newData = JSON.stringify(JSON.stringify(data));

      const query = {
        url : fleet.url
      }

      var newValues = {$set: {
        data: newData,
      }}
      await urls.updateOne(query,newValues, options);




    })



  }catch (e){
    console.error(e);
  }
  // finally {
  //   await client.close();
  // }


}


main().catch(console.error);
