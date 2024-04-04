import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = Schema({
    name: {
        type: String, 
        required: true, 
    },
    username: {
        type: String, 
        required: true, 
        unique: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
        minLength:6,
    },
    profilePicture: {
        type: String, 
        default: ""
    },
    followers: {
        type:[String],
        default:[]
    },
    following: {
        type:[String],
        default:[]
    },
    bio:{
        type: String, 
        default: "",
    },


}, {timestamps:true})

// hashpassword before saving user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model("User", userSchema)

export default User