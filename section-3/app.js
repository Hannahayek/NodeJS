const http = require('http');
const express=require('express');
const path=require('path');
const expressHbs=require('express-handlebars');

const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop');
const bodyParser=require('body-parser'); //npm install --save body-parser
const app=express();

// for pug
//app.set('view engine','pug');
//app.set('views','views');

//handle bars
app.engine('hbs',expressHbs());
app.set('view engine','hbs'); //the name we use here, for example hbs. the pages should end with .hbs
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));// will do body parse for us

//to expose public folder like css
app.use(express.static(path.join(__dirname,'public')));

//order matters  the / should be last
//any start with admin take admin routes
app.use('/admin',adminRoutes.routes)
app.use(shopRoutes);

//set error page 
app.use((req,res,next)=>{
res.status(404).render('404',{docTitle:'Page Not Found'});
});




app.listen(3000);
