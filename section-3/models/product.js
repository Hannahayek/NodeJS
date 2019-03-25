
const Cart = require('./cart');
const db=require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {   //we use ? to avoid sql injection
 return db.execute('insert into products (title,price,imageUrl,description) values(?,?,?,?)',[this.title,this.price,this.description,this.imageUrl]);
  };

  static deleteById(id) {
  
  }

  static fetchAll() {
           return db.execute('select * from products');
  }

  static findById(id) {
  }
};
