const fs=require("fs");
const path=require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports=class Cart{
  static addProduct(id,productPrice){
    //Fetch the previous cart
   fs.readFile(p,(err,fileContent)=>{
   let cart={products:[],totalPrice:0};
   if(!err){
       cart=JSON.parse(fileContent)
   }
        //Analyze the cart=> find existing product
        const existingProductIndex=cart.products.findIndex(prod =>prod.id===id);
        let updatedProduct;
        const existingProduct=cart.products[existingProductIndex]
          // add new product  /increase quantity if exists
        if(existingProduct){
            updatedProduct={...existingProduct};
            updatedProduct.qty=updatedProduct.qty+1;
            //here we replace the updated product
            cart.products[existingProductIndex]=updatedProduct;
        }else{
        //new one

        updatedProduct={id:id,qty:1};
        cart.products=[...cart.products,updatedProduct];
        } // + + to convert to number
        cart.totalPrice=cart.totalPrice + +productPrice;
         cart.products=[...cart.products];
         fs.writeFile(p,JSON.stringify(cart),err=>{
             console.log(err);
         })
   });
    
  

  }
    

}