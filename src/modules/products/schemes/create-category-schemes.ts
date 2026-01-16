import { z } from 'zod';
import { CategoryModel } from '../models/category.model';

export const CreateCategorySchema: z.ZodSchema<CategoryModel> = z.object({
  name: z.string().min(1),
  image_url: z.string(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const UpdateCategorySchema: z.ZodSchema<CategoryModel> =
  CreateCategorySchema;
