import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateTokenandSetCookie from "../utils/helper/generateTokenandSetCookie.js";

import {v2 as cloudinary} from 'cloudinary'
import mongoose from "mongoose";





const signupUser = async(req, res) => {
    try {
        const {name, email, username, password} = req.body;

        const user = await User.findOne({$or:[{email}, {username}]})

        if(user){
            return res.status(400).json({error: "User already exists"})
        }

        const newUser = new User({
            name, 
            email, 
            username, 
            password 
        })
        
        
        newUser && generateTokenandSetCookie(newUser._id, res);
        
        await newUser.save();

        
        if(newUser) {


            const createdUser = await User.findById(newUser._id).select("-password")
            res.status(201).json({data: createdUser})
        } else{
            res.status(400).json({error: "Invalid user data"})
        }

    } catch (error) {
        res.status(500).json({error: error.message})
        console.log('Error in signupUser', error.message)
    }
}

const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error: "User does not exist !!"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "") //if the user exists, bcrypt will compare with its password, if not, then the password will be compared with an empty string.
        if(!isPasswordCorrect){
            return res.status(400).json({error: "Password is incorrect !!"})
        }

        generateTokenandSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            username: user.username,
            bio: user.bio,
            profilePicture: user.profilePicture
            
        })
    } catch (error) {
          console.log("Error while logging user: ", error.message)  
          res.status(500).json({error: error.message})
    }
}

const logoutUser = async(req, res) => {
    try {
        res.cookie('jwt', "", {maxAge: 1}) // set the cookie's value, which consists of logged In user details, is set to an empty string. i.e. log out the user.
        res.status(200).json({message: "User Logged Out successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error while Logging Out User: ", error.message)
    }
}

const followUnfollowUser = async(req, res) => {
    try {
        const {id} = req.params;
        const userToFollow = await User.findById(id)
        const currentUser = await User.findById(req.user._id)
        if(!userToFollow || !currentUser){
            return res.status(400).json({error: "User not Found!"})
        }
        if(id === req.user._id.toString()){
            return res.status(400).json({error: "You cannot follow yourself!"})
        }
        const isFollowing = currentUser.following.includes(id)


        if(isFollowing){
            //if following, then unfollow
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}})
            res.status(200).json({
                message: "Unfollow Successfull"
            })
        }else{
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}})
            res.status(200).json({
                message: "Follow Successfull"
            })
        }

    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error while following/unfollowing User: ", error.message)
    }
}

const updateUser = async(req, res) => {
    try {
        const { name, email, username, password, bio } = req.body;
        let {profilePicture} = req.body;
        const userId = req.user._id;

        if(userId.toString() !== req.params.id){
            return res.status(400).json({error: "You cannot update other accounts."})
        }
        
        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({error: "User not found"})
        }

        if(profilePicture){
            if(user.profilePicture){
                await cloudinary.uploader.destroy(user.profilePicture.split("/").pop().split(".")[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePicture)
            profilePicture = uploadedResponse.secure_url
            
        }

        user.name = name || user.name
        user.username = username || user.username
        user.profilePicture = profilePicture || user.profilePicture
        user.bio = bio || user.bio
        user.email = email || user.email
        user.password = password || user.password

        user = await user.save();

        if(!user){
            return res.status(500).json({error: "error occured while updating user."})
        }

        const newUser = await User.findById(user._id).select("-password")
        res.status(200).json(newUser)


    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error occured while updating User: ", error.message)
    }
}

const getUserProfile = async(req, res) => {
    // we want to get the user profile by either using the username or user id
    // now this query can either be username or userid
    const {query} = req.params
    try {
        // const user = await User.findOne({username}).select("-password -updatedAt")
        let user;


        if(mongoose.Types.ObjectId.isValid(query)){ // check if the query is an object Id
            user = await User.findById(query).select("-password -updatedAt")
        } else { // if query is a username
            user = await User.findOne({username: query}).select("-password -updatedAt")
        }
        if(!user){
            return res.status(400).json({error: "User not found!"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log("Error occured while extracting the user: ", error.message)
    }
}

export {
    signupUser,
    loginUser,
    logoutUser,
    followUnfollowUser,
    updateUser,
    getUserProfile
}