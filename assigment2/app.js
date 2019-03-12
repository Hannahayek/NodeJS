const express=require('express');

const app=express();



app.use('/test',(req,res,next)=>{
  
     res.send("<h1>test page</h1>");
    }); 

app.use('/users',(req,res,next)=>{
console.log("in the middleware!");
res.send("<h1>users page</h1>");
}); 

app.use('/',(req,res,next)=>{
    console.log("the test");
     res.send("<h1>mainpage</h1>");
     
    }); 

app.listen(3000);