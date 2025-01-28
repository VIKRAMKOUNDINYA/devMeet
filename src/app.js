const express=require("express");
const app=express();
const {adminAuth,userAuth}=require("../middlewares/auth");

app.use("/admin",adminAuth
)

// app.use("/",(req,res,next)=>{
//     // res.send("Heyy");
//     next();
// })
app.get("/admin/dat",(req,res,next)=>{
    res.send("Data sent")
    // next();
})
// app.get("/dat",(req,res)=>{
//     res.send("Hey")
// })
// // app.get("",{

// // })
app.get("/user/data",userAuth,(req,res)=>{
    res.send("User Data")
})
app.listen(8081,()=>{
    console.log("server running on port 8080")
});


// app.use("/hey",(req,res)=>{
//     res.send("Hey");
// })

// app.get("/data",(req,res)=>{
//     console.log(req.query);
//     res.send({name:"vikram"});
// })

// app.get("/data/:userInfo/:num",(req,res)=>{
//     console.log(req.params);
//     res.send({name:"vikram"});
// })

// app.post("/data",(req,res)=>{
//     res.send("Data posted successfully");
// })

