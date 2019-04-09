const User=require('../models/user');


exports.getLogin = (req, res, next) => {
  
   res.render('auth/login', {
          path: '/login',
          pageTitle:'Login',
          isAuthenticated:req.session.isloggedIn
        });
     
   
  };
  exports.postLogin = (req, res, next) => {
     //we can use any key here
    User.findById('5ca60e5c4e117e1eccb8818e')
    .then(user => {
      req.session.isloggedIn=true; 
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));
   };

   exports.postLogout = (req, res, next) => {
   req.session.destroy(()=>{
     res.redirect('/');
   })
  };
 
   