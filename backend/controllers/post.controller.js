import Post from "../models/post.model.js"
import User from "../models/user.model.js"



const createPost = async(req, res) => {
    try {
        const {postedBy, text, img} = req.body

        if(!postedBy || !text){
            return res.status(400).json({message: "PostedBy and test fields are required"})
        }

        const user = await User.findById(postedBy)
        if(!user){
            return res.status(400).json({message: "User not found!"})
        }

        if(user._id.toString() !== req.user._id.toString()){
            return res.status(404).json({message: "Unautherized to create post"})
        }
        
        const maxLength = 500
        if(text.length > maxLength){
            return res.status(400).json({message: `Text field cannot exceed ${maxLength} characters`})
        }

        const newPost = new Post({postedBy, text, img})
        await newPost.save();

        res.status(200).json({message:"Post created successfully!", newPost})


    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error occurred while creating the post: ", error.message)
    }
    
}

const getPost = async(req, res) => {
    try {
        const id = req.params.id
    
        const post = await Post.findById(id)
        if(!post){
            return res.status(400).json({message: "Cannot find the post you are looking for."})
        }
    
        res.status(200).json({
            post
        })
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error while getting the post: ", error.message)
    }
}

const deletePost = async(req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({message: "Post could'nt be found."})
        }
    
        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(400).json({message: "Unautherized delete."})
        }
    
        await Post.findByIdAndDelete(postId)
        res.status(200).json({message: "Post deleted Successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("An error occurred while deleting the post: ", error.message)
    }
}

const likeUnlikePost = async(req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({message: "Post does'nt exist!"})
        }
        
        const userId = req.user._id
        const isLiked = post.likes.includes(userId)

        if(isLiked){
            // if liked, then remove the userId from the array of likes
            await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}})
            await post.save()
            return res.status(200).json({message: "Post unliked Successfully"})
        }

        // if not liked, then add the userId into the array of likes
        await Post.findByIdAndUpdate(postId, {$push: {likes: userId}})
        await post.save()
        res.status(200).json({message: "Post liked Successfully"})


    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error while liking/unliking the post: ", error.message)
    }
}

const replyToPost = async(req, res) => {
    try {
        const {text} = req.body
        const postId = req.params.id;
        const userId = req.user._id
        const username = req.user.username
        const userProfilePic = req.user.userProfilePic

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message: "Post not found!"})
        }
        if(!text){
            return res.status(400).json({message: "text field is required"})
        }
        const replies = {userId, text, userProfilePic, username}
        post.replies.push(replies)
        await post.save()

        res.status(200).json({
            message:"replies successfully",
            post
        })


    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error while replying to post", error.message)
    }
}

const getFeedPosts = async(req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
    
        const following = user.following
    
        // get the feed in descending order of the post created by the people whose userId exists in the following array of the user
        const feed = await Post.find({postedBy: {$in: following}}).sort({createdAt: -1}) 
    
        if(!feed){
            return res.status(500).json({message: "Error while fetching posts."})
        }
    
        res.status(200).json({message: "feed fetched successfully", feed})
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error while fetching post.", error.message)
    }
    
}

export {
    createPost,
    getPost,
    deletePost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts
}