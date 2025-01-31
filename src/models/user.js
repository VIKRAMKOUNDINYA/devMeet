const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    laseName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});

const user=mongoose.model("User",userSchema);

module.exports=user;