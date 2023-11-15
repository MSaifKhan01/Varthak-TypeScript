import express,{Request,Response} from "express"


import cors from 'cors';
import dotenv from "dotenv"
import UserRouter from "./Routes/userRoutes";
import BookRouter from "./Routes/BookRouters";
import { connecting } from "./Config/db";
const app=express()

app.use(express.json())
app.use(cors())


dotenv.config()


app.get("/well",(req:Request,res:Response)=>{
    res.send({"msg":"hello"})
})







app.use("/user",UserRouter)
app.use("/",BookRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connecting
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
    console.log("connected to server")
    
})