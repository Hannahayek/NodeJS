const express=require('express');
const bodyParser=require('body-parser');
const app=express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

const users=[];

app.get('/',(req,res,next)=>{
res.render('index',{PageTitle:"Add User"});
});

app.get('/users',(req,res,next)=>{
res.render('users',{PageTitle:'User',users:users});
});


app.post('/add-user',(req,res,next)=>{
     users.push({name: req.body.username});
     res.redirect('/users')
});




app.listen(3000)