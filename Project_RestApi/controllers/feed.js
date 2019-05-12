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
    return res.status(422)
    .json({
      message:'Validation failed, entered data not valid',
      errors:errors.array()});
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
  console.log(err)
});
  

};
