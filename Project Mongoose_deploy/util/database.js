const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=callback =>{
   MongoClient.connect('mongodb+srv://HannaMongo:Hk@password@cluster0-gepst.azure.mongodb.net/shop?retryWrites=true', { useNewUrlParser: true })
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