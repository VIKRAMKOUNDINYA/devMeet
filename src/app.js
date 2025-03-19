const express=require("express");
const app=express();
const connectDB=require('./config/dataBase')
const cors=require('cors')

const cookieParser=require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));


const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const requestRouter=require('./routes/requests')
const userRouter=require('./routes/user')

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)

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




