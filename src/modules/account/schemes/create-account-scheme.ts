import z from 'zod';
import { AccountModel } from '../models/account.models';

export const CreateAccountSchema: z.ZodSchema<AccountModel> = z.object({
  email: z.email(),
  password: z.string().min(8),
  full_name: z.string().min(1),
  phone: z.string().optional(),
  address: z.string().optional(),
  cpf_cnpj: z.string().optional(),
  is_admin: z.boolean().optional(),
});
