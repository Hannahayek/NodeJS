const http = require('http');
const express=require('express');

const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop');
const bodyParser=require('body-parser'); //npm install --save body-parser
const app=express();


app.use(bodyParser.urlencoded({extended:false}));// will do body parse for us

//order matters  the / should be last
app.use(adminRoutes)
app.use(shopRoutes);




app.listen(3000);
