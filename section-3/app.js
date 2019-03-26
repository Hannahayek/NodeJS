const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const Product=require('./models/product');
const User=require('./models/user');

const sequalize=require('./util/database');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findByPk(1).then(user => {
req.user=user;
next();
  })
  .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


//for relation ship in database
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});


//or for relation
//User.hasMany(Product)


//below will look all models defined and creates tables //force:true will force override
//sync({force:true}) to force database
//below code for user will create dummy user
sequalize
.sync()
.then(result =>{
    return User.findByPk(1);
    //console.log(result);
    
})
.then(user =>{
    if(!user){
       return User.create({name:'Hanna',email:'hayekhanna2h@gmail.com'});
    }
    return user;
})
.then(user=>{
   // console.log(user);
    app.listen(3000)
})
.catch(err => {

});


