import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000



connectDB()
.then(()=>{
    app.listen(PORT || 5000, () => 
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`)
    )
})
.catch((error)=>{
    console.log("MongoDB connection failed: ", error)
})


