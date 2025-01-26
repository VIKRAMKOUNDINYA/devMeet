const express=require("express");
const app=express();

// app.use((req,res)=>{
// res.send("Hello from the server")
// })

app.listen(8080,()=>{
    console.log("server running on port 8080")
});

app.use("/hey",(req,res)=>{
    res.send("Hey");
})

app.get("/data",(req,res)=>{
    console.log(req.query);
    res.send({name:"vikram"});
})

app.get("/data/:userInfo/:num",(req,res)=>{
    console.log(req.params);
    res.send({name:"vikram"});
})

app.post("/data",(req,res)=>{
    res.send("Data posted successfully");
})

