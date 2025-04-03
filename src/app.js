const express=require("express");
const app=express();
const connectDB=require('./config/dataBase')
const cors=require('cors')
const http=require('http')

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
const userRouter=require('./routes/user');
const chatRouter=require('./routes/chat')
const initializeSocket = require("./utils/socket");

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)
app.use('/',chatRouter)

const server=http.createServer(app)
initializeSocket(server)

connectDB().
then(()=>{
        console.log("DataBase Connection established..")
        server.listen(8081,()=>{
            console.log("server running on port 8080")
        });
    })
    .catch((err)=>{
    console.log("Issues in DataBase connection")
});




