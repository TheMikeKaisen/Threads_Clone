import express from 'express'
import { createPost, deletePost, getPost } from '../controllers/post.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router()

router.get("/:id",getPost)

//protected routes
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)


export default router;