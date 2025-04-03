const express = require('express');
const { userAuth } = require('../middlewares/auth');
const {validateEditProfileData} = require('../utils/validation')
const User=require('../models/user');

const profileRouter=express.Router();

profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }
    catch(err){
        res.status(401).send("Error"+err.message);
    }
})

profileRouter.post("/profile/edit",userAuth,async (req,res)=> {
     console.log(req.body)
    try{
        
        if(!validateEditProfileData){
            throw new Error("Updates not allowed")
        }
        // if(data?.skills.length>10){
        //     throw new Error("Skills cannot be more than 10");
        // }

        const loggedIn=req.user

        const user=await User.findByIdAndUpdate({_id:loggedIn._id},req.body,
            {runValidators:true}
        );
        // Object.keys(req.body).forEach((key)=>(loggedIn[key]=req.body[key]));

        res.send("Data Updated successfully")
    }
    catch(err){
        res.status(400).send(err.message)
    }   
})

module.exports=profileRouter;