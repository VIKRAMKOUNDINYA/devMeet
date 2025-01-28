const adminAuth=(req,res,next)=>{
    console.log("Admin");
    const token="xyz"
    const isAdmin=token==="xyz"
    if(!isAdmin){
        res.status(401).send("unauthorized req")
    }
    else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    console.log("User");
    const token="abc"
    const isUser=token==="abc"
    if(!isUser){
        res.status(401).send("unauthorized req")
    }
    else{
        next()
    }
}
module.exports={adminAuth,userAuth}