const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=callback =>{
   MongoClient.connect('mongodb+srv://hannahayek:GTfcVZ7hTEJS3mY@cluster0-gdrrc.mongodb.net/shop?retryWrites=true')
   .then(client =>{
      console.log("Connected");
      _db=client.db();  //store connection
      callback(client);
   }).catch(err=>{
      console.log(err);
      throw err;
   });
};


const getDb=()=>{
   if(_db){
      return _db
   }
   throw 'No Database found'
};
exports.mongoConnect=mongoConnect;
exports.getDb=getDb;