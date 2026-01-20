import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().positive(),
});

export class UpdateCartItemDto extends createZodDto(UpdateCartItemSchema) {}
