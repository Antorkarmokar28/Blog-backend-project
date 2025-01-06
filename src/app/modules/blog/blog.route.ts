import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
const router = express.Router();
// create user route
router.post(
  '/blogs',
  validateRequest(BlogValidation.createBlogSchema),
  BlogController.createUser,
);

router.get('/blogs/:id', BlogController.getSingleBlog);

export const BlogRoutes = router;
