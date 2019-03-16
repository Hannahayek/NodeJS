const http = require('http');
const express=require('express');
const path=require('path');

const app=express();


//to expose public folder like css
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','users.html'));
    });


//set error page 
app.use((req,res,next)=>{
res.sendFile(path.join(__dirname,'views','main.html'));
});




app.listen(3000);