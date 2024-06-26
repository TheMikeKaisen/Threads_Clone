import express from "express";
import { followUnfollowUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.get("/profile/:query", getUserProfile)
router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)


// Protected Routes.
router.post("/follow/:id",protectRoute , followUnfollowUser)
router.put("/update/:id", protectRoute, updateUser)




export default router;