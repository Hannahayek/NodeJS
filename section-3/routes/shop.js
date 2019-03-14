const path=require('path');

const express=require('express');
const router=express.Router();

//path will auto  build the path for us
router.get('/',(req,res,next)=>{
 res.sendFile(path.join(__dirname,'../','views','shop.html'));
  
    }); 


    module.exports=router;