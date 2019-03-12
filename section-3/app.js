const http = require('http');
const express=require('express')

const app=express();

app.use('/',(req,res,next)=>{
  
    console.log("this always runs")
    next(); //allows the request to continue to next middle ware
    }); 

app.use('/add-product',(req,res,next)=>{
    console.log("in the middleware!");
  //  next(); //allows the request to continue to next middle ware
     res.send("<h1>add product page</h1>");
    }); 
//to add middleware function will executed with every incoming request
app.use('/',(req,res,next)=>{
console.log("in the middleware!");
res.send("<h1>hello from express</h1>");
}); 



app.listen(3000);
