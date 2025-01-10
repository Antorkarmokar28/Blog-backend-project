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
router.get('/blogs/:id', BlogController.getSingleBlog);
// router.get('/', BlogController.getSingleBlog);
router.patch(
  '/blogs/:id',
  auth('', 'user'),
  validateRequest(BlogValidation.updateBlogSchema),
  BlogController.updateBlog,
);
router.delete('/:id', auth('admin', 'user'), BlogController.deleteBlog);

export const BlogRoutes = router;
