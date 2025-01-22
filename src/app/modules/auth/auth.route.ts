import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from '../user/user.validation';
import { UserAuthController } from './auth.controller';
import { AuthLoginValidation } from './login.validation';
import { UserValidation } from '../user/user.validation';

const router = Router();
// register user router
router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserAuthController.userRegister,
);
//login user router
router.post(
  '/login',
  validateRequest(AuthLoginValidation.loginValidation),
  UserAuthController.userLogin,
);
export const UserRegistrationRouter = router;
