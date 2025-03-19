 const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validationSignUpData } = require('../utils/validation');
const bcrypt=require('bcrypt')
const User=require('../models/user');
const authRouter=express.Router();
authRouter.post('/signup',async (req,res)=>{
    try{
        validationSignUpData(req);
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        })
        const savedUser=await user.save();
        const token=await user.getJWT();
            console.log(token)
            res.cookie("token",token);        
            res.json({message:'User Added Successfully',data:savedUser})

    }
    catch(err){
        res.status(400).send("Error Sending the data"+err.message)
    }
 })

authRouter.post('/login',async (req,res)=>{
    try{
        const {emailId,password}=req.body
        const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid Email ID")
        }
        
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            //token creation
            const token=await user.getJWT();
            console.log(token)
            res.cookie("token",token);
            res.send(user)
            
        }
        else{
            throw new Error("Invalid credentails");
        }

    }catch(err){
        res.status(400).send("Error :"+err.message);
    }
})

authRouter.post('/logout',async (req,res)=>{
try{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send();
}
catch(err){

}
})

authRouter.patch('/profile/password',userAuth,async(req,res)=>{
    try{
    const loggedIn=req.user;
    const newPassword=req.body
    const passwordHash=await bcrypt.hash(newPassword,10);
    const user=await User.findByIdAndUpdate({_id:loggedIn._id},passwordHash,
        {runValidators:true}
    );
    res.send('PAssword Changed Successfully')
}
catch(err){
    res.send(err);
}
})

 module.exports=authRouter;