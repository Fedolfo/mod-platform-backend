import { z } from 'zod';
import { CartModel } from '../models/cart.model';
import { CartItemSchema } from './create-cart-items-schemes';

export const CreateCartSchema: z.ZodSchema<Omit<CartModel, 'id'>> = z.object({
  user_id: z.string().uuid(),
  status: z.enum(['active', 'converted', 'abandoned']).default('active'),
  items: z.array(CartItemSchema).default([]),
});
