const path=require('path');

const express=require('express');

const router=express.Router();

const rootDir=require('../helpers/path');

const adminRoutes=require('./admin')
//path will auto  build the path for us
router.get('/',(req,res,next)=>{
   console.log(adminRoutes.products);
 res.sendFile(path.join(rootDir,'views','shop.html'));
  
    }); 


    module.exports=router;