import jwt from "jsonwebtoken"

const generateTokenandSetCookie = (userId, res) => {

    //sign token
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: '15d',
        })
        res.cookie("jwt", token, {
            httpOnly: true, 
            maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
            sameSite: "strict", // prevents CSRF attacks
        })
    
        return token;

    } catch (e) {
        res.status(500).json({message: `Error while creating token : ${e}`})
    }

}

export default generateTokenandSetCookie