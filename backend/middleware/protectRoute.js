import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
    
        if(!token){
            return res.status(500).json({message: "Unautherized"})
        }
    
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
    
        const user = await User.findById(decodedUser.userId).select("-password")
    
        if(!user){
            return res.status(500).json({message: "User not found"})
        }
        req.user = user;
    
        next();
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in protectRoute: ", error.message)
    }
}

export default protectRoute;