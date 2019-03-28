const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient;

const mongoConnect=callback =>{
   MongoClient.connect('mongodb+srv://hannahayek:GTfcVZ7hTEJS3mY@cluster0-gdrrc.mongodb.net/test?retryWrites=true')
   .then(client =>{
      console.log("Connected");
      callback(client);
   }).catch(err=>{
      console.log(err);
   })
}

module.exports=mongoConnect;