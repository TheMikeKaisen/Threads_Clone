import express from "express";
import { followUnfollowUser, loginUser, logoutUser, signupUser } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)


// Protected Routes.
router.post("/follow/:id",protectRoute , followUnfollowUser)




export default router;