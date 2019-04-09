exports.getLogin = (req, res, next) => {
  
   res.render('auth/login', {
          path: '/login',
          pageTitle:'Login',
          isAuthenticated:req.isloggedIn
        });
     
   
  };
  exports.postLogin = (req, res, next) => {
    req.session.isloggedIn=true;  //we can use any key here
    res.redirect('/')

   };
 
