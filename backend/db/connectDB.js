import mongoose from "mongoose";


const connectDB = async() => {
    try {
        // connect to db
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log(`MongoDb connected: ${conn.connection.host}`)
        }
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB