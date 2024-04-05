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
        const {id} = req.params
    
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



export {
    createPost,
    getPost
}