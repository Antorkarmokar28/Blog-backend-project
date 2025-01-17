import { z } from 'zod';
// Define the userFullNameSchema
const createUserFullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, { message: 'Last name is required' }),
});

// Define the userSchema
const createUserValidationSchema = z.object({
  body: z.object({
    name: createUserFullNameValidationSchema,
    email: z.string().trim().email('Invalid email format'),
    password: z.string().nonempty('Password is required'),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().default(false).optional(),
  }),
});

// Define the update userFullNameSchema
const updateUserFullNameValidationSchema = z.object({
  firstName: z.string().trim().optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});
// Define the update userSchema
const updateUserValidationSchema = z.object({
  body: z.object({
    name: updateUserFullNameValidationSchema.optional(),
    email: z.string().trim().email('Invalid email format').optional(),
    password: z.string().nonempty('Password is required').optional(),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().default(false).optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
