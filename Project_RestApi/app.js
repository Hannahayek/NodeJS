const express=require('express');

const feedRoutes=require('./routes/feed');

const app=express();


//any incoming request that starts with /feed will forward to feedroutes
app.use('/feed',feedRoutes)

app.listen(8080);