import { z } from 'zod';
import { ProductModel } from '../models/products.model';

export const CreateProductSchema: z.ZodSchema<ProductModel> = z.object({
  categoryId: z.uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  dimensions: z.string().min(1),
  leadTime: z.string().min(1),
  mainImageUrl: z.string(),
  galleryImages: z.array(z.string()),
  originalPrice: z.number().positive(),
  discountPercent: z.number().positive(),
  rating: z.number().positive(),
  status: z.enum(['active', 'inactive']),
});
