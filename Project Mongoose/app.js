const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const User=require('./models/user')
const app = express();
const mongoose=require('mongoose')

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ca60e5c4e117e1eccb8818e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://HannaMongo1:wf4F8LDwKgZvU8h@cluster0-gepst.mongodb.net/shop?retryWrites=true', { useNewUrlParser: true }).then(result=>{
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

  


