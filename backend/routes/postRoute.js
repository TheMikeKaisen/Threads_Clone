import express from 'express'
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyToPost } from '../controllers/post.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router()


//protected routes
router.get('/feed', protectRoute, getFeedPosts)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.post('/like/:id', protectRoute, likeUnlikePost)
router.post('/reply/:id', protectRoute, replyToPost)



router.get("/:id",getPost)

export default router;