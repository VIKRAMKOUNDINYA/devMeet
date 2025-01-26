const express=require("express");
const app=express();

// app.use((req,res)=>{
// res.send("Hello from the server")
// })

app.listen(8081,()=>{
    console.log("server running on port 8080")
});

app.use("/hey",(req,res)=>{
    res.send("Hey");
})

app.use("/hello",(req,res)=>{
    res.send("Hello");
})