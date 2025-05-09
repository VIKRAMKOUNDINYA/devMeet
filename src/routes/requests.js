const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest=require('../models/connectionRequest')
const User=require('../models/user')

const requestRouter=express.Router();

requestRouter.post('/request/send/:status/:toUserId',userAuth,async (req,res)=>{
    try{
         const fromUserId=req.user._id;
         const status=req.params.status;
         const toUserId=req.params.toUserId;
         const allowedStatus=["ignored","interested"];
         if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type: "+status})
         }
         const toUser=await User.findById(toUserId);
         if(!toUser){
            return res.status(404).send("User not found")
         }
         const existngConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ]
         });
         if(existngConnectionRequest){
            return res.status(400).send({message:"Connection Request Already Exists !!"});
         }
         const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
         })
        const data=await connectionRequest.save();
         res.json({
            message:
            req.user.firstName +"is"+status +"in"+toUserId.firstName,   
            data
         })
    }
    catch(err){
        res.status(400).send("Error Sending the data"+err.message)
    }
})


requestRouter.post('/request/review/:status/:requestId',userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const status=req.params.status
        const requestId=req.params.requestId
        allowedStatus=['accepted','rejected'];
        if(!allowedStatus.includes(status)){
           return res.status(400).send('Invalid status type'+status)
        }
        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        });
        if(!connectionRequest){
            return res.status(400).send('Connection req not found')
        }
        connectionRequest.status=status;
        const data=await connectionRequest.save();
        res.json({message:"Connection request "+status,data});
    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
})
module.exports=requestRouter;