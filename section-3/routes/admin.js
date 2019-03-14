const express=require('express');

const router=express.Router();
// /admin/add-product =>Get
router.get('/add-product',(req,res,next)=>{
    
    res.send(`<form action="/product" method="POST"><input type="text" name ="title"><button type="submit">Add Product</button></form>`);
     }); 

  // /admin/add-product =>post   
 //we change to post to trigger only with post request
 router.post('/add-product',(req,res,next)=>{
 console.log(req.body);
 res.redirect('/');
 });


 module.exports=router;