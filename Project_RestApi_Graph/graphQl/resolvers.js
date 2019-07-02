const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
  createUser: async function({ userInput }, req) {
    //   const email = args.userInput.email;
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      error.data=errors
      error.code=422;
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login:async function({email,password}){
    const user=await User.findOne({email:email});
    if(!user){
      const error =new Error("user not found");
      error.code=401;
      throw error;
    }
    const isEqual=await bcrypt.compare(password,user.password);

    if(!isEqual){
      const error=new Error("wrong password");
      error.code=201;
      throw error;
    }
    const token=jwn.sign(
      {
      userId:user._id.toString(),
      email:user.email
    },'someSecretweusefor the token',
    {expiresIn:'1h'}
    );
    return {token: token,userId :user._id.toString()};
  }
};
