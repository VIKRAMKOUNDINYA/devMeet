const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        require:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password"+value)
            }
        }
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female",'others'].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://geographyandyou.com/images/user-profile.png"
    },
    about:{
        type:String,
        default:"This is a default Description"
    },
    skills:{
        type:[String],
        validate:{
            validator:function(value){
                return value.length<=10;
            },
            message:"You cannot have more than 10 skills"
        }
    }
},
{
    timestamps:true,
});

userSchema.methods.getJWT=async function(){
const user=this
const token=await jwt.sign({_id:user.id},"DEVMeet@2000",{
    expiresIn:"7d",  
});
return token
}
 
userSchema.methods.validatePassword=async function(passwordByUser){
    const user=this
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordByUser,passwordHash);
    return isPasswordValid;
}
const  user=mongoose.model("User",userSchema);

module.exports=user;