const http = require('http');
const express=require('express');
const path=require('path');

const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop');
const bodyParser=require('body-parser'); //npm install --save body-parser
const app=express();


app.use(bodyParser.urlencoded({extended:false}));// will do body parse for us

//to expose public folder like css
app.use(express.static(path.join(__dirname,'public')));

//order matters  the / should be last
//any start with admin take admin routes
app.use('/admin',adminRoutes)
app.use(shopRoutes);

//set error page 
app.use((req,res,next)=>{
res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});




app.listen(3000);
