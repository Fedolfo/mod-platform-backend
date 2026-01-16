import z from 'zod';
import { LoginAccountModel } from '../models/login-account.models';

export const LoginAccountSchema: z.ZodSchema<LoginAccountModel> = z.object({
  email: z.email(),
  password: z.string().min(8),
});
