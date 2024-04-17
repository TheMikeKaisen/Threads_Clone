import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoute.js'
import messageRoute from './routes/messageRoute.js'

import {v2 as cloudinary} from 'cloudinary'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
 })


//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true}))
app.use(cookieParser())


//routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use('/api/messages', messageRoute)

connectDB()
.then(()=>{
    app.listen(PORT || 5000, () => 
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`)
    )
})
.catch((error)=>{
    console.log("MongoDB connection failed: ", error)
})


