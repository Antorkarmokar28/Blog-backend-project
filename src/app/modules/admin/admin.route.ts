import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';

const router = Router();

router.patch(
  '/admin/users/:userId/block',
  auth('admin', ''),
  validateRequest(UserValidation.updateUserValidationSchema),
  AdminController.userIsBlockInfoUpdating,
);

router.delete(
  '/admin/blogs/:id',
  auth('admin', ''),
  AdminController.userBlogDelete,
);
export const AdminActionRouter = router;
