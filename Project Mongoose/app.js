const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//const User=require('./models/user')
const app = express();
const mongoose=require('mongoose')

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5ca4de0f1c9d44000043e77d')
//     .then(user => {
//       req.user = new User(user.name,user.email,user.cart,user._id);
//       next();
//     })
//     .catch(err => console.log(err));

// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://HannaMongo1:wf4F8LDwKgZvU8h@cluster0-gepst.mongodb.net/shop?retryWrites=true', { useNewUrlParser: true }).then(result=>{
  app.listen(3000);
}).catch(err =>{
  console.log(err);
})

  


