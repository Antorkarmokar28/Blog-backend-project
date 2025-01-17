import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();
// create user route
router.post(
  '/blogs',
  auth('admin', 'user'),
  validateRequest(BlogValidation.createBlogSchema),
  BlogController.createBlog,
);
// get single blog
router.get('/blogs/:id', BlogController.getSingleBlog);
// get all blog
router.get('/blogs', BlogController.getAllBlog);
//update blog
router.patch(
  '/blogs/:id',
  auth('admin', 'user'),
  validateRequest(BlogValidation.updateBlogSchema),
  BlogController.updateBlog,
);
// delete blog
router.delete('/blogs/:id', auth('admin', 'user'), BlogController.deleteBlog);

export const BlogRoutes = router;
