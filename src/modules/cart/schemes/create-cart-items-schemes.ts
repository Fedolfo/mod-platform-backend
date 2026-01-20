import z from 'zod';
import { CartItemsModel } from '../models/cart-items.model';

export const CartItemSchema: z.ZodSchema<Omit<CartItemsModel, 'id'>> = z.object(
  {
    cart_id: z.string().uuid(),
    product_id: z.string().uuid(),
    quantity: z.number().int().positive(),
    unitPriceSnapshot: z.number().optional(),
  },
);
