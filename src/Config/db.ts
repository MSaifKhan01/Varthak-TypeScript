const mongoose=require("mongoose")

import dotenv from "dotenv"
dotenv.config()


export const connecting=mongoose.connect(process.env.url ||"")