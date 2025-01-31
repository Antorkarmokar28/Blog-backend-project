import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserAuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();
router.post(
  '/register',
  validateRequest(AuthValidation.userRegistrationValidationSchema),
  UserAuthController.userRegister,
);
//login user router
router.post(
  '/login',
  validateRequest(AuthValidation.userLoginValidation),
  UserAuthController.userLogin,
);
export const UserLoginRouter = router;
