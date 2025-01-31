import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();
// create user route
router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(BlogValidation.createBlogSchema),
  BlogController.createBlog,
);
// get single blog
router.get('/:id', BlogController.getSingleBlog);
// get all blog
router.get('/', BlogController.getAllBlog);
//update blog
router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidation.updateBlogSchema),
  BlogController.updateBlog,
);
// delete blog
router.delete('/:id', auth('admin', 'user'), BlogController.deleteBlog);

export const BlogRoutes = router;
