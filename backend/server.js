import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000



app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


//routes
app.use("/api/users", userRoutes)

connectDB()
.then(()=>{
    app.listen(PORT || 5000, () => 
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`)
    )
})
.catch((error)=>{
    console.log("MongoDB connection failed: ", error)
})


