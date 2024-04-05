import express from 'express'
import { createPost, getPost } from '../controllers/post.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router()

router.get("/:id",getPost)

//protected routes
router.post('/create', protectRoute, createPost)


export default router;