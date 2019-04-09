const mongoose=require('mongoose');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const MONGODB_URI='mongodb+srv://HannaMongo1:wf4F8LDwKgZvU8h@cluster0-gepst.mongodb.net/shop';
const path = require('path');

const express = require('express');

const store= new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions'
});

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const User=require('./models/user');
const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'any secret here will work',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req,res,next) => {

  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)

  .then(user => {
    req.user=user
   next();
  })
  .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(result=>{
User.findOne().then(user =>{
  if(!user){
    const user=new User({
      name:'Hanna',
      email:'hayekhanna2@gmail.com',
      cart:{
        items:[]
      }
    })
    user.save();
  }
});  

  app.listen(3000);
}).catch(err =>{
  console.log(err);
})

  


