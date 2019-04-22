const bcrypt=require('bcryptjs');
const User = require('../models/user');
//for mails
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');

//Validation
const {validationResult}=require('express-validator/check');

//for token for reset
const crypto=require('crypto');

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
  }
}));

exports.getLogin = (req, res, next) => {
  let message=req.flash('error');
  if(message.length>0){
     message=message[0] 
  }else{
    message=null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMassage:message
    
  });
};

exports.getSignup = (req, res, next) => {
  let message=req.flash('error');
  if(message.length>0){
    message=message[0] 
 }else{
   message=null;
 }
  
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMassage:message
  
  });
};

exports.postLogin = (req, res, next) => {
   const email=req.body.email;
   const password=req.body.password;
   User.findOne({email:email})
    .then(user => {
      if(!user){ // error is the key to call the  massage
        req.flash('error','Invalid email or password')
        return res.redirect('/login')
      }
      bcrypt.compare(password,user.password)
      .then(doMatch =>{
        if(doMatch){
         
          req.session.isLoggedIn = true;
          req.session.user = user;
         return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        }
        req.flash('error','Invalid email or password')
        res.redirect('/login')
      })
      .catch(err=>
        {
          console.log(err);
          res.redirect('/login')
      } );
     
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email=req.body.email;
  const password=req.body.password;
  const confirmPassword=req.body.confirmPassword;
  const errors=validationResult(req);
 console.log(errors);
  if(!errors.isEmpty()){
    return res.status(442).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMassage:errors.array()[0].msg
    });  
  }
  User.findOne({email:email})
  .then(userDoc =>{
    if (userDoc){
      req.flash('error','email already exists')
      return res.redirect('/signup');
    }
    return bcrypt.hash(password,12)
    .then(hashedPassword =>{
      const user=new User({
        email:email,
        password:hashedPassword,
        cart:{items:[]}
      });
      return user.save();
    })
    .then( result =>{
      res.redirect('/login');
      return transporter.sendMail({
        to:email,
        from:'myfirstproject.com',
        subject:'Signup succeeded',
        html:'<h1> You successfully signed up</h1>'
      }) .catch(err=>{
        console.log(err);
      })
     
    })  
    })
    
    .catch(err=>{
    console.log(err);
  })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};


exports.getReset = (req, res, next) => {
  let message=req.flash('error');
  if(message.length>0){
    message=message[0] 
 }else{
   message=null;
 }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMassage:message
  
  });
};


exports.postReset=(req,res,next)=>{
   crypto.randomBytes(32,(err,buffer)=>{
     if(err){
       console.log(err)
       return res.redirect('/reset');
     }
     const token=buffer.toString('hex');
     User.findOne({email:req.body.email})
     .then(user =>{
       if(!user){
         req.flash('error','Email Account doesnt exist');
         return res.redirect('/reset');
       }
       user.resetToken=token;
       user.resetTokenExpiration=Date.now()+360000;  //one hour
       return user.save()
     })
     .then(result =>{
       res.redirect('/');
      transporter.sendMail({
        to:req.body.email,
        from:'myfirstproject.com',
        subject:'Password reset',
        html:`
         <p>You requested password reset</p>
         <p> Click this <a href='http://localhost:3000/reset/${token}'>link</a>  to set a new password</p>
        `
      }).then(result =>{
        console.log("email sent to " +req.body.email);
      })
     })
     .catch(err =>{
       console.log(err);
     })
   })
};
//gt= greater

exports.getNewPassword=(req,res,next) => {
  const token=req.params.token;
  User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
  .then(user =>{
    let message=req.flash('error');
    if(message.length>0){
      message=message[0] 
   }else{
     message=null;
   }
    res.render('auth/new-password', {
    path: '/new-password',
    pageTitle: 'New Password',
    errorMassage:message,
    userId:user._id.toString(),
    passwordToken:token
  })
  });
};

exports.postNewPassword=(req,res,next)=>{
  const newPassword=req.body.password;
  const userId=req.body.userId;
  const passwordToken=req.body.passwordToken;
   let resetUser;
  User.findOne({resetToken:passwordToken,resetTokenExpiration:{$gt:Date.now() }
  ,_id:userId})
  .then(user =>{
    resetUser=user;
   return bcrypt.hash(newPassword,12);
  })
  .then(hashedPassword =>{
   resetUser.password=hashedPassword;
   resetUser.resetToken=null;
   resetUser.resetTokenExpiration=undefined;
   return resetUser.save();
  })
  .then(result=>{
    res.redirect('/login')
  })
  .catch(err =>{
    console.log(err);
  });
}
