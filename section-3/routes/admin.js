const express=require('express');

const path=require('path');

const rootDir=require('../helpers/path');

const router=express.Router();

const products=[];
// /admin/add-product =>Get
router.get('/add-product',(req,res,next)=>{
    
    res.render('add-product',{docTitle:'Add Product',path:'/admin/add-product'})
     }); 

  // /admin/add-product =>post   
 //we change to post to trigger only with post request
 router.post('/add-product',(req,res,next)=>{
 products.push({title:req.body.title});
 res.redirect('/');
 });


 //module.exports=router;

 exports.routes=router;
 exports.products=products;