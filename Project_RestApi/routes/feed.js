const express=require('express');

const feedControlloer=require('../controllers/feed');

const router =express.Router();


//Get //feed/posts
router.get('/posts',feedControlloer.getPosts);

module.exports=router;