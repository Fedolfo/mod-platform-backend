import z from 'zod';
import { AddressModel } from '../models/address.models';

export const AddressAccountSchema: z.ZodSchema<AddressModel> = z.object({
  accountId: z.uuid(),
  number: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  complement: z.string().optional(),
  fullAddress: z.string().optional(),
});
