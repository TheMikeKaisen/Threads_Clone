import express from 'express'
import { createPost, deletePost, getFeedPosts, getPost, getUserPosts, likeUnlikePost, replyToPost } from '../controllers/post.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router()


//protected routes
router.get('/feed', protectRoute, getFeedPosts)
router.get('/user/:username', protectRoute, getUserPosts)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.put('/like/:id', protectRoute, likeUnlikePost)
router.put('/reply/:id', protectRoute, replyToPost)



router.get("/:id",getPost)

export default router;