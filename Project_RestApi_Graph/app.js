const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const multer=require('multer');
const fs=require('fs');
const graphHttp=require('express-graphql')
const graphQlSchema=require('./graphQl/schema');
const graphResolver=require('./graphQl/resolvers');
const auth=require('./middleware/auth');
const app = express();

const uuidv4 = require('uuid/v4')
 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4())
    }
});


const fileFilter=(req,file,cb)=>{
    if(
        file.mimetype==='image/png'
    ||file.mimetype==='image/jpg'||
    file.mimetype==='image/jpeg'
    )
    {
      cb(null,true);
    }else{
        cb(null,false);
    }
}

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
    multer({storage:storage,fileFilter:fileFilter}).single('image')
    )
app.use('/images',express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method ==='OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});
app.use(auth);

 app.put('/post-image',(req,res,next)=>{
     if(!req.isAuth){
         throw new Error('Not Aunthicated')

     }
     if(!req.file){
         return res.status(200).json({message :'No file provided'});
     }
     if(req.body.oldPath){
         clearImage(req.body.oldPath);
     }

     return res.status(201).json({message: 'file Stored',filePath: req.file.path })

 });



app.use('/graphql',graphHttp({
  schema:graphQlSchema,
  rootValue :graphResolver,
  graphiql:true,
  customFormatErrorFn(err){
      if(!err.originalError){
          return err;
      }
      const data=err.originalError.data;
      const message=err.message || 'An error occured';
      const code=err.originalError.code || 500;
      return {message:message ,status: code ,data :data};
  }
})
);
app.use((error,req,res,next)=>{
console.log(error)
const status=error.statusCode || 500;
const message=error.message;
const data=error.data;
res.statusCode(status).json({message:message,data:data})
});


mongoose.connect('mongodb://localhost:27017/messages')
.then(result =>{
   app.listen(8080);
   

})
.catch(err =>{
    console.log(err);
})


const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };