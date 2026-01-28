import { z } from 'zod';
import { ProductModel } from '../models/products.model';

export const CreateProductSchema: z.ZodSchema<ProductModel> = z.object({
  category_id: z.uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  dimensions: z.string().min(1),
  lead_time: z.string().min(1),
  main_image_url: z.string(),
  gallery_images: z.array(z.string()),
  original_price: z.number().positive(),
  discount_percent: z.number().nonnegative(),
  rating: z.number().positive(),
  status: z.enum(['active', 'inactive']),
});
