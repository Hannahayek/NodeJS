const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const mongoose=require('mongoose');
const path=require('path');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use('/images',express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use((error,req,res,next)=>{
console.log(error)
const status=error.statusCode || 500;
const message=error.message;
res.statusCode(status).json({message:message})
});

app.use('/feed', feedRoutes);
mongoose.connect('mongodb://localhost:27017/messages').then(result =>{
    app.listen(8080);
}).catch(err =>{
    console.log(err);
})
