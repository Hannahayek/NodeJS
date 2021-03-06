const mongoose=require('mongoose');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const MONGODB_URI=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-gepst.mongodb.net/${process.env.MONGO_DATABASE}`;
const MONGODB_URI1=`mongodb://localhost:27017/${process.env.MONGO_DATABASE_LOCAL}`;
const path = require('path');
const csrf=require('csurf');
const flash=require('connect-flash');
const multer=require('multer');
const shopController = require('./controllers/shop');
const isAuth = require('./middleware/is-auth');
const User=require('./models/user');
const helmet=require('helmet');
const compression=require('compression');


const express = require('express');

const store= new MongoDBStore({
  uri: MONGODB_URI1,
  collection:'sessions'
});

const csrfProtection=csrf();

const fileStorage=multer.diskStorage({
destination:(req,file,cb)=>{
  cb(null,'images');
  },
filename:(req,file,cb)=>{
  cb(null,file.filename+'-'+file.originalname);
}

});



const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(helmet());
app.use(compression());

// for filtering file types
const fileFilter=(req,file,cb)=>{
if(file.mimetype==='image/png' || file.mimetype==='image/jpg' ||file.mimetype==='image/jpeg'){
  cb(null,true);
}else{
  cb(null,false);
}
 
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images',express.static(path.join(__dirname, 'images')));


app.use(
  session({
    secret: 'any secret here will work',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

//to add data to session should be called after session
app.use(flash());


app.use((req,res,next) => {

  if(!req.session.user){
    return next();
  }

  User.findById(req.session.user._id)

  .then(user => {
    if(!user){ return next();}

    req.user=user
   next();
  })
  .catch(err =>{
    throw new Error(err);
  });
});

//middle ware to user all tokens in all views
app.use((req,res,next)=>{
  res.locals.isAuthenticated= req.session.isLoggedIn;
 
  next();
})
//we added created router here, so we dont use csrf check for it,so csrf after it
app.post('/create-order', isAuth, shopController.postOrder);
// we initiliaze csrf after session
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500',errorController.get500);

app.use(errorController.get404);

/* const error=new Error(err);
error.httpStatusCode=500;
return next(error); */
//below will be called when we use above for error handler
app.use((error,req,res,next)=>{
 res.redirect(500);

});



mongoose.connect(MONGODB_URI1, { useNewUrlParser: true })
.then(result=>{
  app.listen(process.env.PORT || 3000);
}).catch(err =>{
  console.log(err);
})

  


