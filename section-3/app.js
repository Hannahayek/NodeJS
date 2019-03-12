const http = require('http');
const express=require('express')

const app=express();

//to add middleware function will executed with every incoming request
app.use((req,res,next)=>{
console.log("in the middleware!");
next(); //allows the request to continue to next middle ware
}); 

app.use((req,res,next)=>{
console.log("another middleware")
res.send("<html>Hello from response</html>"); //allows to send a response
});

const server = http.createServer(app);  //will exexute function for incoming requestsn

server.listen(3000);
