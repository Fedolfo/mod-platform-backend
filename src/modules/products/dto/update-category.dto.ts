import { UpdateCategorySchema } from '../schemes/create-category-schemes';
import { createZodDto } from 'nestjs-zod';

export class UpdateCategoryDto extends createZodDto(UpdateCategorySchema) {}
