const {validationResult}=require('express-validator/check');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
      _id  :'1',
     title: 'First Post',
     content: 'This is the first post!',
     imageUrl:'images/birds.jpg' ,
     creator:{
       name:'Hanna Hayek'
     },
     createdAt:new Date()
    }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
     const error=new Error('Validation failed, entered data not valid');
     error.statusCode=422;
     throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const Post=require('../models/post');
const post=new Post({
  title: title, 
      content: content,
      imageUrl:'images/birds.jpg'
      ,creator:{name:'Hanna Munir'}
    
})
 post
.save()
.then(result =>{
  console.log(result)
  res.status(201).json({
    message: 'Post created successfully!',
    post: result
  });
})
.catch(err =>{
  if(!err.statusCode){
    err.statusCode=500;
  }
  next(err);
});
  

};
