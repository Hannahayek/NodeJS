const path=require('path');

const express=require('express');

const router=express.Router();

const rootDir=require('../helpers/path');

const adminRoutes=require('./admin')
//path will auto  build the path for us
router.get('/',(req,res,next)=>{
   const products=adminRoutes.products;
  res.render('shop',{prods:products,docTitle:'Shop',path:'/',hasProducts:products.length>0});
  
    }); 


    module.exports=router;