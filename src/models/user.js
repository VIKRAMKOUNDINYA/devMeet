const mongoose=require('mongoose');
const validator=require('validator')
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
        default:"https://oldweb.brur.ac.bd/wp-content/uploads/2019/03/male.jpg"
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
 
const user=mongoose.model("User",userSchema);

module.exports=user;