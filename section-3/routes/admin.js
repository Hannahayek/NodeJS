const express=require('express');
const path=require('path');
const router=express.Router();
// /admin/add-product =>Get
router.get('/add-product',(req,res,next)=>{
    
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
     }); 

  // /admin/add-product =>post   
 //we change to post to trigger only with post request
 router.post('/add-product',(req,res,next)=>{
 console.log(req.body);
 res.redirect('/');
 });


 module.exports=router;