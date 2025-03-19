const express=require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const User=require('../models/user')
const userRouter=express.Router();

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await connectionRequest.find({
            toUserId:loggedInUser.id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName","photoUrl","skills","age","gender"])

        res.json({
            message:"Data feteched Successfully",
            data:connectionRequests,
        })
    }
    catch(err){
        res.send(err.message)
    }
})

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser.id,status:"accepted"},
                {fromUserId:loggedInUser.id,status:"accepted"}
            ],

        }).populate("fromUserId",["firstName","lastName","photoUrl","skills","about","age","gender"])
          .populate("toUserId",["firstName","lastName","photoUrl","skills","about","age","gender"])


        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data})
    }
    catch(err){
        res.send({message:err.message})
    }
})

userRouter.get("/feed",userAuth, async (req,res)=>{
    try{
    const loggedInUser=req.user;
    const connectionRequests=await connectionRequest.find({
        $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
    }).select("fromUserId toUserId");

    const page=parseInt(req.query.page) || 1;
    let limit =parseInt(req.query.limit) || 10;

    limit=limit >50 ? 50:limit;

    const skip=(page-1)*limit;

    const hiddenUsersFromFeed=new Set();
    connectionRequests.forEach((req)=>{
        hiddenUsersFromFeed.add(req.fromUserId.toString());
        hiddenUsersFromFeed.add(req.toUserId.toString());
    })

    const users=await User.find({
        $and:[
            {_id:{$nin: Array.from(hiddenUsersFromFeed)}},
            {_id:{$ne:loggedInUser._id}}
        ]
    }).select(["firstName","lastName","photoUrl","skills"]).skip(skip).limit(limit);

    console.log(hiddenUsersFromFeed);
    res.send(users)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports=userRouter;