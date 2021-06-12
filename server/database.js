const {MongoClient} = require('mongodb');
const uri = process.env.URL_DB;

module.exports = {
    Database: class Database{
    constructor(table){
      this.table = table;
    }
    static async build(){
      const client = new MongoClient(uri, {useUnifiedTopology: true});
      await client.connect();
      const database = client.db("urls");
      const urls = database.collection("urls");
      return new Database(urls);
    }
    async send(url,data){
      this.table.insertOne({
        url : url,
        data : data
      },function(err, res) {
      if (err) throw err;
      });
    }
    async get(url){
      let res = await this.table.findOne({url: url});
      return res;
    }
  }
}
