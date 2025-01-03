import { z } from 'zod';
// Define the userFullNameSchema
const userFullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, { message: 'Last name is required' }),
});

// Define the userSchema
const userValidationSchema = z.object({
  body: z.object({
    name: userFullNameValidationSchema,
    email: z.string().trim().email('Invalid email format'),
    password: z.string().nonempty('Password is required'),
    role: z.enum(['admin', 'user']),
    isBlocked: z.boolean().default(false),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
