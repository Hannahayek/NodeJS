const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    creator:{
        trype:Object,
        required:String
    }

},{timestamps:true} //will save time stamps for changes

);

module.exports=mongoose.model('Post',postSchema);