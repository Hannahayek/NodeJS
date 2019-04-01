const getDb = require('../util/database').getDb;
const mongodb=require('mongodb');

const ObjectId=mongodb.ObjectId;

class User{
  constructor(username,email,cart,id){
  this.name=username;
  this.email=email;
  this.cart=cart; //{items:[]}
  this._id=id
 }
  save(){
    
    const db = getDb();
    let dbOp;
    if(this._id){
      //update the product
      dbOp=db.collection('users').updateOne({_id: this._id},{$set:this});  //this will update all fields but not ID    
    }else{
      dbOp=db
      .collection('users')
      .insertOne(this)
    }
    return dbOp
     
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  static findById(userId){
    const db=getDb();                                         //_id saved as object
     return db.collection('users').find({_id:new mongodb.ObjectId(userId)})
     .next() //to get last id returned
     .then(user =>{
      return user;
     })
     .catch(err =>{
       console.log(err);
     })
  }

  addToCart(product){
    const updatedCart={
      items:[{productId:new ObjectId(product._id),quantity:1}]
    }
    const db=getDb();
   return db
   .collection('users')
   .updateOne(
      {_id:new ObjectId(this._id)},
     {$set:{cart:updatedCart}}
    );
  }
}

module.exports = User;
