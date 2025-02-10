const express=require("express");
const app=express();
const connectDB=require('./config/dataBase')
const User=require('./models/user');
const {validationSignUpData}=require('./utils/validation');
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const cookieParser=require("cookie-parser");
const {userAuth}=require("../middlewares/auth")
app.use(express.json());
app.use(cookieParser());

app.get("/feed",async (req,res)=>{
    try{
        const Users=await User.find({})
        res.send(Users)
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

app.post('/login',async (req,res)=>{
    try{
        const {emailId,password}=req.body
        const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid Credentials")
        }
        
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            //token creation
            const token=await jwt.sign({_id:user._id},"DEVMeet@2000")
            console.log(token)
            res.cookie("token",token);
            res.send("Login Successful")
            
        }
        else{
            throw new Error("Invalid credentails");
        }

    }catch(err){
        res.send(400).send("Error :"+err.message);
    }
})
app.get('/profile',userAuth,async(req,res)=>{
    try{
        const user=req.user;
    res.send(user);
    }
    catch(err){
        res.send("Error"+err.message);
    }
})
app.post("/signup",async (req,res)=>{
    
    try{
    console.log(req.body)
    validationSignUpData(req)
    const {firstName,lastName,emailId,password}=req.body
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash)
    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash
    })
    await user.save();
    res.send("Data added successfully")
    }catch(err){
        res.status(400).send("Error Sending the data"+err.message)
    }
})

app.get("/user",async (req,res)=>{
    const data=req.body.emailId
    console.log(data)
    try{
        const user=await User.find({emailId:data})
        res.status(200).send(user)
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

app.delete("/user",async (req,res)=>{
    const data=req.body._id
    try{
        const user=await User.deleteOne(data);
        res.send("Data deleted Successfully");
    }
    catch(err){
        res.send("Error deleting data")
    }
})

app.patch("/user/:userId",async (req,res)=> {
    const userId=req.params.userId
    const data=req.body
    console.log(data)
    try{
        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills","firstName"]
        const isUpdatesAllowed=Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
        )
        if(!isUpdatesAllowed){
            throw new Error("Updates not allowed")
        }
        // if(data?.skills.length>10){
        //     throw new Error("Skills cannot be more than 10");
        // }
        const user=await User.findByIdAndUpdate({_id:userId},data,
            {runValidators:true}
        );
        res.send("Data Updated successfully")
    }
    catch(err){
        res.send(err.message)
    }   
})

connectDB().
then(()=>{
        console.log("DataBase Connection established..")
        app.listen(8081,()=>{
            console.log("server running on port 8080")
        });
    })
    .catch((err)=>{
    console.log("Issues in DataBase connection")
});




