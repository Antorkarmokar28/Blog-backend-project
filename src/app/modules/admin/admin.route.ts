import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';

const router = Router();

router.patch(
  '/users/:userId/block',
  auth('admin'),
  validateRequest(AuthValidation.userUpdateRegistrationValidationSchema),
  AdminController.userIsBlockInfoUpdating,
);

router.delete('/blogs/:id', auth('admin'), AdminController.userBlogDelete);
export const AdminActionRouter = router;
