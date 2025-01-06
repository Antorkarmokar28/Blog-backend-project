import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

// get single user route
router.get('/:id', UserController.getSingleUser);
// get all user route
router.get('/', UserController.getAllUser);
// update data route
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUser,
);
export const UserRoute = router;
