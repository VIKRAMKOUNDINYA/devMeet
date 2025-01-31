const mongoose=require("mongoose");
const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://vikramkoundinya:27120043@nodetrial.gbece.mongodb.net/devMeet")
}

module.exports=connectDB;
