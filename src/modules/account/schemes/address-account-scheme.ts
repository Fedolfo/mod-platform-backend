import z from 'zod';
import { AddressModel } from '../models/address.models';

export const AddressAccountSchema: z.ZodSchema<AddressModel> = z.object({
  account_id: z.uuid(),
  number: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  complement: z.string().optional(),
  full_address: z.string().optional(),
});
