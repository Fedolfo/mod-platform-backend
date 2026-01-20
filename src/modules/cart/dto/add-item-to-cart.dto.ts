import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const AddItemToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPriceSnapshot: z.number().optional(),
});

export class AddItemToCartDto extends createZodDto(AddItemToCartSchema) {}
