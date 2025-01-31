const express=require("express");
const app=express();
const connectDB=require('./config/dataBase')
const User=require('./models/user');


app.post("/signup",async (req,res)=>{
    const user=new User({
        firstName:"vikram",
        lastName:"Koundinya",
        emailId:"Virkam@gamil.com",
        age:24,
        password:"Abcd@2000"
    })
    try{
    await user.save();
    res.send("Data added successfully")
    }catch(err){
        res.status(400).send("Error Sending the data")
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




