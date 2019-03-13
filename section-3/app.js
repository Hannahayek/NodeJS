const http = require('http');
const express=require('express')
const bodyParser=require('body-parser'); //npm install --save body-parser
const app=express();

/* app.use('/',(req,res,next)=>{
  
    console.log("this always runs")
    next(); //allows the request to continue to next middle ware
    });  */

  app.use(bodyParser.urlencoded({extended:false}));// will do body parse for us

app.use('/add-product',(req,res,next)=>{
    
   res.send(`<form action="/product" method="POST"><input type="text" name ="title"><button type="submit">Add Product</button></form>`);
    }); 
//we change to post to trigger only with post request
app.post('/product',(req,res,next)=>{
console.log(req.body);
res.redirect('/');
});


//to add middleware function will executed with every incoming request
app.use('/',(req,res,next)=>{

res.send("<h1>hello from express</h1>");
}); 



app.listen(3000);
