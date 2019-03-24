const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   
    getProductsFromFile(products => {
      //to update in case exists
      if(this.id){ /// if product exists this.id===
       const existingProductIndex=products.findIndex(prod=> prod.id===this.id);
       // we save the products in updated products, then we replace the updated product in tt with the old one
       const updatedProducts=[...products];
       updatedProducts[existingProductIndex]=this;
       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
      }else{ //new product
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
     
    });
  }

   static deleteById(id){
    getProductsFromFile(products => { //filter will fetch array without the one with id
     const updatedProducts=products.filter(prod =>prod.id !==id);
     fs.writeFile(p,JSON.stringify(updatedProducts),err =>{
       if(!err){
         
       }
     })
    });
   }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
