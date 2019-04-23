const express = require('express');

const authController = require('../controllers/auth');
//validations
const { check,body }=require('express-validator/check');

const User =require('../models/user')
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',[
body('email')
.isEmail()
.withMessage('Please use Valid email for Login'),
body('password','Password has to be valid')
.isLength({min:5})
.isAlphanumeric()

]

,authController.postLogin);




router.post('/signup',check('email')
.isEmail()
.withMessage('Please enter a valid email.')
.custom((value,{req})=>{
 /* if(value==='test@test.com') {
     throw new Error('this email address cant be used');
    }
    return true;   */   
    return User.findOne({email:value}).then(userDoc =>{
      if (userDoc){
       return Promise.reject(
           'email exists, please use another email'
           );
      }
    });
    }),  
//second argument in body will be default error message
body('password','Please enter password with only numbers and text at least 5 chars')
.isLength({min:5})
.isAlphanumeric(),
body('confirmPassword').custom((value,{req})=>{
    if(value!==req.body.password) throw new Error('Passwords are not match');
})
,authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;