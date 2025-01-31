import { z } from 'zod';

const userLoginValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6)
      .max(20),
  }),
});

// Define the userSchema
const userRegistrationValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().trim().email('Invalid email format'),
    password: z.string().nonempty('Password is required').min(6),
    role: z.enum(['admin', 'user']).default('user').optional(),
    isBlocked: z.boolean().default(false).optional(),
  }),
});
const userUpdateRegistrationValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().trim().email('Invalid email format').optional(),
    password: z.string().nonempty('Password is required').min(6).optional(),
    role: z.enum(['admin', 'user']).default('user').optional(),
    isBlocked: z.boolean().default(false).optional(),
  }),
});

export const AuthValidation = {
  userRegistrationValidationSchema,
  userLoginValidation,
  userUpdateRegistrationValidationSchema,
};
